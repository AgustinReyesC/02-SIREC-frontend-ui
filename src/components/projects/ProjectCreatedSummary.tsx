import { Link } from 'react-router-dom'
import type { ProjectCreated } from '../../lib/projects.api'
import { formatDate, STATUS_LABEL } from '../../lib/projectStatus'

interface ProjectCreatedSummaryProps {
    project: ProjectCreated
    onCreateAnother: () => void
}

/** Confirmación que pide CA-01. */
function ProjectCreatedSummary({ project, onCreateAnother }: ProjectCreatedSummaryProps) {
    return (
        <div role="status" className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5 10 17l9-10" />
                </svg>
            </div>
            <p className="mb-8 text-lg text-sirec-text">
                Tu proyecto se registró y ya está en el proceso de revisión.
            </p>

            <dl className="mb-10 divide-y divide-slate-200 rounded-xl border border-slate-200 text-left">
                {[
                    ['Título', project.projectName],
                    ['Estado', (
                        <span className="rounded-full bg-sirec-navy/10 px-3 py-1 text-sm font-bold text-sirec-navy">
                            {STATUS_LABEL[project.projectStatus] ?? project.projectStatus}
                        </span>
                    )],
                    ['Manuscrito', `${project.document.fileName} (versión ${project.document.versionNumber})`],
                    ['Fecha de envío', formatDate(project.document.uploadedAt)],
                    ['Folio', `#${project.projectId}`],
                ].map(([label, value]) => (
                    <div key={String(label)} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                        <dt className="w-40 shrink-0 text-sm font-bold uppercase tracking-wide text-sirec-muted">{label}</dt>
                        <dd className="m-0 break-words text-sirec-text">{value}</dd>
                    </div>
                ))}
            </dl>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                    to="/proyectos"
                    className="rounded-xl bg-sirec-navy px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white no-underline transition-colors hover:bg-sirec-navy-dark"
                >
                    Ver mis proyectos
                </Link>
                <button
                    type="button"
                    onClick={onCreateAnother}
                    className="cursor-pointer rounded-xl border border-sirec-navy bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-sirec-navy transition-colors hover:bg-sirec-navy hover:text-white"
                >
                    Crear otro proyecto
                </button>
            </div>
        </div>
    )
}

export default ProjectCreatedSummary
