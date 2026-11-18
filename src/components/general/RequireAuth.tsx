import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

/** Manda a /login si no hay sesión y regresa a esta página después. */
function RequireAuth({ children }: { children: ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }
    return children
}

export default RequireAuth
