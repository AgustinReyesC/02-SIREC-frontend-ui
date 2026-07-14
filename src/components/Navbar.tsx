import { NavLink } from "react-router-dom";

const tabs = [
    {to: '/', label: 'Inicio'},
    { to: '/about', label: 'Acerca'},
    { to: '/updates', label: 'Actualizaciones'}
]

function Navbar() {
    return (
        <header className="border-b border-ink/10">
            <div className="max-w-5xl mx-auto px-6 flex items-end justify-between">
                <nav className="flex items-end gap-1 pt-4">
                    {tabs.map((tab) => (
                        <NavLink   
                            key={tab.to}
                            to={tab.to}
                            end={tab.to === '/'}
                            className={({ isActive }) => 
                            `px-5 py-3 font-mono text-xs uppercase tracking-wide rounded-t-md border border-b-0 transition-colors ${
                                isActive
                                    ? 'bg-paper border-ink/10 text-ink-text relative top-px'
                                    : 'bg-ink/5 border-transparent text-ink-text/50 hover:text-ink-text/80'
                                }`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    ))};
                </nav>

                <NavLink
                    to="/login"
                    className="mb-3 bg-oxblood text-paper text-sm font-body px-5 py-2 rounded hover:bg-oxblood/90 transition-colors"
                >
                    Acceder
                </NavLink>
            </div>
        </header>
    )
}

export default Navbar;