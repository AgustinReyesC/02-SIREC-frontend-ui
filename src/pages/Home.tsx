const roles = [
  { name: 'Autor', desc: 'Envía artículos y da seguimiento a su revisión.' },
  { name: 'Revisor', desc: 'Dictamina artículos según su área de experticia.' },
  { name: 'Administrador', desc: 'Asigna revisores y decide el destino editorial.' },
  { name: 'Developer', desc: 'Mantiene el sistema y gestiona accesos privilegiados.' },
]

const steps = [
  { n: '01', label: 'Envío', desc: 'El autor sube su artículo con la metadata completa.' },
  { n: '02', label: 'Asignación', desc: 'Un administrador designa revisores por área.' },
  { n: '03', label: 'Dictamen', desc: 'Cada revisor entrega su recomendación.' },
  { n: '04', label: 'Decisión', desc: 'El equipo editorial resuelve el destino del artículo.' },
]

function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-24 flex flex-col items-start">
        <span className="font-mono text-xs uppercase tracking-widest text-oxblood mb-6">
          SIREC — v0.1 en desarrollo
        </span>

        <div className="flex items-start gap-8 w-full">
            <div className="flex-1">
                <h1 className="font-display text-6xl leading-[1.05] text-ink-text mb-6">
                De borrador a<br />publicación.
                </h1>
                <p className="text-ink-text/70 text-lg max-w-md mb-8">
                Sistema editorial para gestionar el proceso completo de revisión
                por pares: envío, asignación, dictamen y decisión.
                </p>


                <div className="flex gap-3">
                <a
                    href="/login"
                    className="bg-oxblood text-paper px-6 py-3 rounded font-body hover:bg-oxblood/90 transition-colors"
                >
                    Acceder
                </a>
                
                <a
                    href="#proceso"
                    className="border border-ink-text/20 text-ink-text px-6 py-3 rounded font-body hover:border-ink-text/40 transition-colors"
                >
                    Conocer el proceso
                </a>
                </div>


            
                <div
                    className="hidden md:flex shrink-0 w-32 h-32 rounded-full border-2 border-dashed border-oxblood/60 items-center justify-center rotate-[-8deg] mt-4"
                    style={{ animation: 'stamp 0.6s ease-out' }}
                >
                    <span className="font-mono text-[10px] uppercase tracking-wide text-oxblood text-center leading-tight">
                    En<br />revisión
                    </span>
                </div>
            </div>
        </div>
      </section>

      <section id="proceso" className="py-20 border-t border-ink/10">
        <h2 className="font-display text-3xl text-ink-text mb-10">Cómo funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.n}>
              <span className="font-mono text-sm text-oxblood">{step.n}</span>
              <h3 className="font-display text-xl text-ink-text mt-2 mb-2">{step.label}</h3>
              <p className="text-ink-text/60 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-ink/10 pb-28">
        <h2 className="font-display text-3xl text-ink-text mb-10">Roles del sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div
              key={role.name}
              className="border border-ink/10 rounded-lg p-6 bg-white/40"
            >
              <h3 className="font-display text-lg text-ink-text mb-1">{role.name}</h3>
              <p className="text-ink-text/60 text-sm">{role.desc}</p>
            </div>
          ))}
        </div>

      </section>

      <style>{`
        @keyframes stamp {
          0% { transform: rotate(-8deg) scale(1.4); opacity: 0; }
          60% { transform: rotate(-8deg) scale(0.95); opacity: 1; }
          100% { transform: rotate(-8deg) scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style> 
    </div>
  )
}

export default Home