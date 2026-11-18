import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageCard from '../components/general/PageCard'
import {
    type DocumentSummary,
    getDocumentFile,
    getMyProjects,
    type ProjectSummary,
    toApiFailure,
} from '../lib/projects.api'
import { formatDate, STATUS_BADGE_CLASS, STATUS_LABEL } from '../lib/projectStatus'

type LoadState =
    | { kind: 'loading' }
    | { kind: 'error'; message: string }
    | { kind: 'ready'; projects: ProjectSummary[] }

const primaryButton =
    'inline-block rounded-xl bg-sirec-navy px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white no-underline shadow-lg shadow-sirec-navy/20 transition-colors hover:bg-sirec-navy-dark'

/** Apoyo a HU-01: el autor ve los proyectos que ha creado. */
function MyProjects() {
    const [state, setState] = useState<LoadState>({ kind: 'loading' })
    const [openError, setOpenError] = useState<string | null>(null)
    const [opening, setOpening] = useState<number | null>(null)

    const fetchProjects = useCallback(
        () =>
            getMyProjects().then(
                (projects) => setState({ kind: 'ready', projects }),
                (error: unknown) => setState({ kind: 'error', message: toApiFailure(error).message }),
            ),
        [],
    )

    useEffect(() => {
        void fetchProjects()
    }, [fetchProjects])

    const retry = () => {
        setState({ kind: 'loading' })
        void fetchProjects()
    }

    const openDocument = async (project: ProjectSummary, document: DocumentSummary) => {
        setOpenError(null)
        setOpening(document.documentId)
        // Se abre la pestaña antes de la descarga para que el navegador no la bloquee
        const tab = window.open('', '_blank')
        try {
            const blob = await getDocumentFile(project.projectId, document.versionNumber)
            const url = URL.createObjectURL(blob)
            if (tab) tab.location.href = url
            else window.location.assign(url)
            window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
        } catch (error) {
            tab?.close()
            setOpenError(`No se pudo abrir "${document.fileName}": ${toApiFailure(error).message}`)
        } finally {
            setOpening(null)
        }
    }

    return (
        <PageCard title="Mis proyectos" widthClass="max-w-4xl">
            <div className="mb-8 flex justify-center">
                <Link to="/proyectos/nuevo" className={primaryButton}>
                    Crear proyecto
                </Link>
            </div>

            {openError && (
                <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {openError}
                </div>
            )}

            {state.kind === 'loading' && (
                <p aria-live="polite" className="text-center text-sirec-muted">Cargando tus proyectos…</p>
            )}

            {state.kind === 'error' && (
                <div role="alert" className="text-center">
                    <p className="mb-4 text-red-800">{state.message}</p>
                    <button type="button" onClick={retry}
                        className="cursor-pointer bg-transparent text-sirec-navy underline">
                        Intentar de nuevo
                    </button>
                </div>
            )}

            {state.kind === 'ready' && state.projects.length === 0 && (
                <p className="text-center leading-7 text-sirec-muted">
                    Todavía no has creado ningún proyecto.
                </p>
            )}

            {state.kind === 'ready' && state.projects.length > 0 && (
                <ul className="m-0 list-none space-y-4 p-0">
                    {state.projects.map((project) => (
                        <li key={project.projectId}
                            className="rounded-2xl border border-slate-200 px-5 py-5 transition-colors hover:border-slate-300 sm:px-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                    <h2 className="m-0 break-words text-lg font-bold text-sirec-text">
                                        {project.projectName}
                                    </h2>
                                    <p className="m-0 mt-1 text-sm text-sirec-muted">
                                        Folio #{project.projectId} · Enviado el {formatDate(project.createdAt)}
                                    </p>
                                </div>
                                <span className={`self-start whitespace-nowrap rounded-full px-3 py-1 text-sm font-bold ${STATUS_BADGE_CLASS[project.projectStatus] ?? ''}`}>
                                    {STATUS_LABEL[project.projectStatus] ?? project.projectStatus}
                                </span>
                            </div>

                            {project.projectDescription && (
                                <p className="mb-0 mt-3 whitespace-pre-line break-words leading-7 text-sirec-text/80">
                                    {project.projectDescription}
                                </p>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.documents.map((document) => (
                                    <button
                                        key={document.documentId}
                                        type="button"
                                        disabled={opening === document.documentId}
                                        onClick={() => void openDocument(project, document)}
                                        className="flex max-w-full cursor-pointer items-center gap-2 rounded-lg border border-sirec-navy/30 bg-white px-3 py-2 text-sm text-sirec-navy transition-colors hover:border-sirec-navy hover:bg-sirec-navy/5 disabled:cursor-wait disabled:opacity-60"
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                                            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                                            <path d="M14 3v5h5" />
                                        </svg>
                                        <span className="truncate">
                                            {opening === document.documentId
                                                ? 'Abriendo…'
                                                : `Versión ${document.versionNumber}: ${document.fileName}`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </PageCard>
    )
}

export default MyProjects
