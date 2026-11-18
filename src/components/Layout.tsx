import { Outlet } from 'react-router-dom'
import { NavBar } from './general/NavBar'
import { useAuthStore } from '../store/auth.store'
import { isAuthor } from '../lib/roles'

function Layout() {
  const user = useAuthStore((state) => state.user)

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/acerca-de', label: 'Acerca de' },
    ...(isAuthor(user?.roles)
      ? [
          { to: '/proyectos', label: 'Mis proyectos' },
          { to: '/proyectos/nuevo', label: 'Crear proyecto' },
        ]
      : []),
  ]

  return (
    <div className="flex min-h-screen flex-col font-sirec">
      <NavBar links={links} />
      <main className="relative flex-1 overflow-hidden bg-sirec-surface px-4 py-12 sm:py-16">
        {/* Manchas suaves del fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-slate-300/40 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="relative">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
