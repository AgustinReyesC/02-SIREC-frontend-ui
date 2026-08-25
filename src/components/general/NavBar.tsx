import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

interface props {
    links:{
        to: any,
        label: String
    }[],
}

function NavBar({links: tabs} : props) {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const isLoginPage = pathname === '/login'
    const { isAuthenticated, logout } = useAuthStore()

    const handleAuthClick = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        logout()
        navigate('/login', { replace: true })
    }

    return (
        <header
            className={isLoginPage ? 'bg-paper' : 'bg-[#102a43]'}
        >
            <div className="max-w-5xl mx-auto px-6 flex items-end justify-between">
                <nav className="flex items-end gap-1 pt-4">
                    {tabs.map((tab) => (
                        <NavLink   
                            key={tab.to}
                            to={tab.to}
                            end={tab.to === '/'}
                            className={({ isActive }) =>
                            `px-5 py-3 font-mono text-xs uppercase tracking-wide rounded-t-md transition-colors ${
                                isActive
                                    ? isLoginPage
                                        ? 'bg-[#102a43] text-white!'
                                        : 'bg-paper text-[#102a43]!'
                                    : isLoginPage
                                        ? 'text-[#102a43]/60 hover:text-[#102a43]'
                                        : 'text-white/60 hover:text-white'
                            }`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={handleAuthClick}
                    className="mb-3 bg-oxblood text-paper text-sm font-body px-5 py-2 rounded hover:bg-oxblood/90 transition-colors"
                >
                    {!isAuthenticated? 'Acceder' : 'Cerrar Sesión'}
                </button>
            </div>
        </header>
    )
}

export {NavBar} ;