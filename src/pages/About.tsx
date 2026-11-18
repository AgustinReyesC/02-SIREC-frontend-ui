import PageCard from '../components/general/PageCard'

const PULSOTEC_URL = 'https://pulsotec.itlalaguna.edu.mx/'

function About() {
    return (
        <PageCard title="Esta página es un sistema de gestión editorial">
            <p className="mb-8 text-justify text-base leading-8 tracking-wide text-sirec-muted sm:text-lg">
                Esta página es una extensión de la página de PulsoTec, diseñada específicamente para el
                manejo y revisión de artículos científicos. Puedes acceder a la página original de
                PulsoTec mediante el siguiente enlace:
            </p>
            <a
                href={PULSOTEC_URL}
                target="_blank"
                rel="noreferrer"
                className="block break-all rounded-xl border border-slate-200 px-4 py-4 text-center tracking-wide text-sirec-text no-underline transition-colors hover:border-sirec-navy"
            >
                {PULSOTEC_URL}
            </a>
        </PageCard>
    )
}

export default About
