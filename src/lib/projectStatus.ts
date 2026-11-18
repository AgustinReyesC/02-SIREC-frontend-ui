import type { ProjectStatus } from './projects.api'

export const STATUS_LABEL: Record<ProjectStatus, string> = {
    open: 'Abierto',
    closed_approved: 'Aprobado',
    closed_rejected: 'Rechazado',
}

export const STATUS_BADGE_CLASS: Record<ProjectStatus, string> = {
    open: 'bg-sirec-navy/10 text-sirec-navy',
    closed_approved: 'bg-emerald-50 text-emerald-800',
    closed_rejected: 'bg-red-50 text-red-800',
}

export function formatDate(iso: string): string {
    return new Date(iso).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' })
}
