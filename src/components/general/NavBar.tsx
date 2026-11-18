import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

interface props {
    links: {
        to: string,
        label: string
    }[],
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10.5" />
            <circle cx="12" cy="9.5" r="3.2" />
            <path d="M6.5 18.2c1.3-2.3 3.2-3.4 5.5-3.4s4.2 1.1 5.5 3.4" />
        </svg>
    )
}

function NavBar({ links: tabs }: props) {
    const navigate = useNavigate()
    const { isAuthenticated, user, logout } = useAuthStore()

    const handleAuthClick = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <header className="font-sirec">
            {/* Franja del logo */}
            <div className="bg-white">
                <div className="mx-auto flex max-w-6xl justify-center px-4 py-4">
                    <Link to="/" aria-label="SIREC, ir al inicio"
                        className="font-logo text-5xl font-bold tracking-wide no-underline sm:text-6xl">
                        <span className="text-black">SI</span>
                        <span className="text-sirec-gold">REC</span>
                    </Link>
                </div>
            </div>

            {/* Barra de navegación */}
            <div className="bg-sirec-navy">
                <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-10">
                    <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.to}
                                to={tab.to}
                                end
                                className={({ isActive }) =>
                                    `border-b-2 py-1 text-sm font-bold uppercase tracking-wide no-underline transition-colors sm:text-base ${
                                        isActive
                                            ? 'border-sirec-gold text-white'
                                            : 'border-transparent text-white/85 hover:text-white'
                                    }`
                                }
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {isAuthenticated && user?.mail && (
                            <span className="hidden text-sm text-white/70 md:inline">{user.mail}</span>
                        )}
                        <button
                            type="button"
                            onClick={handleAuthClick}
                            className="flex cursor-pointer items-center gap-3 bg-transparent text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80 sm:text-base"
                        >
                            <UserIcon />
                            {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export { NavBar };
