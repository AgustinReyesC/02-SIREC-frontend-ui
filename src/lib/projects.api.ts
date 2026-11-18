import { isAxiosError } from 'axios'
import { api } from './api'

/** Mismos límites que el backend (CA-02 y CA-04). */
export const PROJECT_NAME_MIN = 5
export const PROJECT_NAME_MAX = 200
export const MAX_PDF_SIZE_MB = 10
export const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024

export type ProjectStatus = 'open' | 'closed_approved' | 'closed_rejected'

export interface DocumentSummary {
    documentId: number
    versionNumber: 1 | 2
    fileName: string
    uploadedAt: string
}

/** Respuesta 201 de POST /projects (ProjectCreatedDto). */
export interface ProjectCreated {
    projectId: number
    projectName: string
    projectStatus: ProjectStatus
    document: DocumentSummary
}

/** Un proyecto de GET /projects/mine (ProjectSummaryDto). */
export interface ProjectSummary {
    projectId: number
    projectName: string
    projectDescription: string | null
    projectStatus: ProjectStatus
    createdAt: string
    documents: DocumentSummary[]
}

export async function getMyProjects(): Promise<ProjectSummary[]> {
    const { data } = await api.get<ProjectSummary[]>('/projects/mine')
    return data
}

/** Descarga el PDF con el token de sesión (un enlace normal no lo enviaría). */
export async function getDocumentFile(projectId: number, versionNumber: 1 | 2): Promise<Blob> {
    const { data } = await api.get<Blob>(`/projects/${projectId}/documents/${versionNumber}`, {
        responseType: 'blob',
    })
    return data
}

export interface CreateProjectInput {
    projectName: string
    projectDescription?: string
    file: File
}

export async function createProject(
    input: CreateProjectInput,
    onProgress?: (percent: number) => void,
): Promise<ProjectCreated> {
    const form = new FormData()
    form.append('projectName', input.projectName)
    if (input.projectDescription) {
        form.append('projectDescription', input.projectDescription)
    }
    form.append('file', input.file)

    const { data } = await api.post<ProjectCreated>('/projects', form, {
        onUploadProgress: (event) => {
            if (onProgress && event.total) {
                onProgress(Math.round((event.loaded / event.total) * 100))
            }
        },
    })
    return data
}

/** Error de la API ya traducido a un mensaje y al campo al que corresponde. */
export interface ApiFailure {
    status: number | null
    message: string
    field: 'projectName' | 'file' | null
}

export function toApiFailure(error: unknown): ApiFailure {
    if (!isAxiosError(error) || !error.response) {
        return {
            status: null,
            message: 'No se pudo conectar con el servidor. Revisa que el backend esté corriendo.',
            field: null,
        }
    }

    const { status, data } = error.response
    const raw = (data as { message?: string | string[] } | undefined)?.message
    const message = Array.isArray(raw) ? raw.join(' ') : raw

    switch (status) {
        case 400:
            // CA-02 (título) o CA-05 (falta el archivo)
            return /título/i.test(message ?? '')
                ? { status, message: message!, field: 'projectName' }
                : { status, message: message ?? 'Revisa los datos del formulario.', field: 'file' }
        case 409: // CA-07
            return { status, message: message ?? 'Ya tienes un proyecto abierto con ese título.', field: 'projectName' }
        case 413: // CA-04
            return { status, message: message ?? `El archivo excede el tamaño máximo de ${MAX_PDF_SIZE_MB} MB.`, field: 'file' }
        case 415: // CA-03
            return { status, message: message ?? 'El manuscrito debe ser un archivo PDF válido.', field: 'file' }
        case 401:
            return { status, message: 'Tu sesión expiró. Vuelve a iniciar sesión.', field: null }
        case 403: // CA-06
            return { status, message: message ?? 'Solo los autores pueden crear proyectos.', field: null }
        default: // CA-08 (500) u otros
            return { status, message: message ?? 'Ocurrió un error inesperado. Intenta de nuevo.', field: null }
    }
}
