import type { ReactNode } from 'react'

interface PageCardProps {
    title: string
    children: ReactNode
    /** Ancho máximo de la tarjeta (clase de Tailwind). */
    widthClass?: string
}

/** Tarjeta blanca centrada con título en mayúsculas (estilo general de SIREC). */
function PageCard({ title, children, widthClass = 'max-w-3xl' }: PageCardProps) {
    return (
        <section
            className={`mx-auto w-full ${widthClass} rounded-3xl bg-white px-6 py-10 shadow-[0_12px_40px_rgba(17,58,92,0.14)] sm:px-12 sm:py-14`}
        >
            <h1 className="mb-8 text-center text-2xl font-bold uppercase leading-snug tracking-[0.08em] text-sirec-text sm:text-3xl">
                {title}
            </h1>
            {children}
        </section>
    )
}

export default PageCard
