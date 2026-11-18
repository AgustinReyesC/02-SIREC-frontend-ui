import { useState } from 'react'
import PageCard from '../components/general/PageCard'
import CreateProjectForm from '../components/projects/CreateProjectForm'
import ProjectCreatedSummary from '../components/projects/ProjectCreatedSummary'
import type { ProjectCreated } from '../lib/projects.api'
import { isAuthor } from '../lib/roles'
import { useAuthStore } from '../store/auth.store'

/** HU-01 Crear proyecto. */
function CreateProject() {
    const user = useAuthStore((state) => state.user)
    const [created, setCreated] = useState<ProjectCreated | null>(null)

    if (created) {
        return (
            <PageCard title="¡Proyecto creado!">
                <ProjectCreatedSummary project={created} onCreateAnother={() => setCreated(null)} />
            </PageCard>
        )
    }

    return (
        <PageCard title="Crear proyecto">
            <p className="mb-8 text-center leading-7 tracking-wide text-sirec-muted">
                Sube tu manuscrito en PDF con su título para que el editor pueda asignarle revisores.
            </p>
            {!isAuthor(user?.roles) && (
                <div role="note" className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Tu cuenta no tiene el rol de autor; el sistema rechazará el envío.
                </div>
            )}
            <CreateProjectForm onCreated={setCreated} />
        </PageCard>
    )
}

export default CreateProject
