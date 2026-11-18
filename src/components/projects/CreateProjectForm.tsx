import { type FormEvent, useState } from 'react'
import {
    createProject,
    MAX_PDF_SIZE_BYTES,
    MAX_PDF_SIZE_MB,
    PROJECT_NAME_MAX,
    PROJECT_NAME_MIN,
    type ProjectCreated,
    toApiFailure,
} from '../../lib/projects.api'
import PdfDropzone from './PdfDropzone'

interface CreateProjectFormProps {
    onCreated: (project: ProjectCreated) => void
}

interface FieldErrors {
    projectName?: string
    file?: string
}

/** Las mismas reglas que el backend, para avisar antes de enviar. */
function validateTitle(title: string): string | undefined {
    const length = title.trim().length
    if (length === 0) return 'El título es obligatorio.'
    if (length < PROJECT_NAME_MIN || length > PROJECT_NAME_MAX) {
        return `El título debe tener entre ${PROJECT_NAME_MIN} y ${PROJECT_NAME_MAX} caracteres.`
    }
}

async function validateFile(file: File | null): Promise<string | undefined> {
    if (!file) return 'Debes adjuntar el manuscrito en PDF.'
    if (!file.name.toLowerCase().endsWith('.pdf')) {
        return 'El manuscrito debe ser un archivo PDF válido.'
    }
    if (file.size > MAX_PDF_SIZE_BYTES) {
        return `El archivo excede el tamaño máximo de ${MAX_PDF_SIZE_MB} MB.`
    }
    // Un PDF real empieza con "%PDF-" (un archivo renombrado no)
    const signature = await file.slice(0, 5).text()
    if (signature !== '%PDF-') return 'El manuscrito debe ser un archivo PDF válido.'
}

const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sirec-text shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:ring-4 ${
        hasError
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
            : 'border-slate-300 hover:border-slate-400 focus:border-sirec-navy focus:ring-sirec-navy/10'
    }`

const labelClass = 'mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-sirec-text'

function CreateProjectForm({ onCreated }: CreateProjectFormProps) {
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<FieldErrors>({})
    const [formError, setFormError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleFileChange = async (selected: File | null) => {
        setFile(selected)
        setErrors((current) => ({ ...current, file: selected ? undefined : current.file }))
        if (selected) {
            const fileError = await validateFile(selected)
            setErrors((current) => ({ ...current, file: fileError }))
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFormError(null)

        const nextErrors: FieldErrors = {
            projectName: validateTitle(projectName),
            file: await validateFile(file),
        }
        setErrors(nextErrors)
        if (nextErrors.projectName || nextErrors.file || !file) return

        setSubmitting(true)
        setProgress(0)
        try {
            const created = await createProject(
                {
                    projectName: projectName.trim(),
                    projectDescription: projectDescription.trim() || undefined,
                    file,
                },
                setProgress,
            )
            onCreated(created)
        } catch (error) {
            const failure = toApiFailure(error)
            if (failure.field) {
                setErrors({ [failure.field]: failure.message })
            } else {
                setFormError(failure.message)
            }
        } finally {
            setSubmitting(false)
        }
    }

    const titleLength = projectName.trim().length

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-7">
            {formError && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {formError}
                </div>
            )}

            <div>
                <label htmlFor="projectName" className={labelClass}>
                    Título <span className="text-red-700">*</span>
                </label>
                <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    value={projectName}
                    disabled={submitting}
                    maxLength={PROJECT_NAME_MAX + 50}
                    placeholder="Título de tu artículo"
                    aria-invalid={!!errors.projectName}
                    aria-describedby="projectName-ayuda"
                    onChange={(event) => {
                        setProjectName(event.target.value)
                        if (errors.projectName) setErrors((current) => ({ ...current, projectName: undefined }))
                    }}
                    onBlur={() => projectName && setErrors((current) => ({ ...current, projectName: validateTitle(projectName) }))}
                    className={inputClass(!!errors.projectName)}
                />
                <div id="projectName-ayuda" className="mt-2 flex justify-between gap-4 text-sm">
                    <span role={errors.projectName ? 'alert' : undefined} className="text-red-700">
                        {errors.projectName}
                    </span>
                    <span className={titleLength > PROJECT_NAME_MAX ? 'text-red-700' : 'text-sirec-muted'}>
                        {titleLength}/{PROJECT_NAME_MAX}
                    </span>
                </div>
            </div>

            <div>
                <label htmlFor="projectDescription" className={labelClass}>
                    Descripción <span className="font-normal normal-case tracking-normal text-sirec-muted">(opcional)</span>
                </label>
                <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows={5}
                    value={projectDescription}
                    disabled={submitting}
                    placeholder="Resumen breve de tu trabajo"
                    onChange={(event) => setProjectDescription(event.target.value)}
                    className={`${inputClass(false)} resize-y`}
                />
            </div>

            <div>
                <span className={labelClass}>
                    Manuscrito <span className="text-red-700">*</span>
                </span>
                <PdfDropzone file={file} error={errors.file} disabled={submitting} onChange={handleFileChange} />
            </div>

            {submitting && (
                <div aria-live="polite">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full bg-sirec-navy transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-2 text-center text-sm text-sirec-muted">
                        {progress < 100 ? `Subiendo manuscrito… ${progress}%` : 'Registrando proyecto…'}
                    </p>
                </div>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-xl bg-sirec-navy px-4 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-sirec-navy/20 transition-colors hover:bg-sirec-navy-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sirec-navy/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {submitting ? 'Enviando…' : 'Crear proyecto'}
            </button>
        </form>
    )
}

export default CreateProjectForm
