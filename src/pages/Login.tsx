import '../styles/Login.css'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import RoleSelector from '../components/LoginPage/RoleSelector'
import LoginFields from '../components/LoginPage/auth_forms/login/LoginFields'
import { type LoginRole, rolesAsDictionary } from '../assets/constants'
import { loginErrorMessage, loginRequest } from '../lib/auth.api'
import { useAuthStore } from '../store/auth.store'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
    const [isHovered, setIsHovered] = useState(false)
    const loginRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            loginRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)

        return () => window.clearTimeout(timeout)
    }, [])

    const location = useLocation()
    const [selectedRole, setSelectedRole] = useState<LoginRole>(rolesAsDictionary.AUTHOR)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuthStore()

    // POST /auth/login: el backend valida correo, contraseña y que tenga el rol elegido
    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget)
        setLoading(true)
        setError(null)
        try {
            const { accessToken, user } = await loginRequest({
                mail: String(formData.get('email') ?? ''),
                password: String(formData.get('password') ?? ''),
                role: selectedRole,
            })
            login(accessToken, { uid: user.uid, mail: user.mail, name: user.name, roles: [user.role] })

            const from = (location.state as { from?: string } | null)?.from
            const home = user.role === rolesAsDictionary.AUTHOR ? '/proyectos' : '/'
            navigate(from ?? home, { replace: true })
        } catch (loginError) {
            setError(loginErrorMessage(loginError))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div
                ref={loginRef}
                className="main-container min-h-screen w-full max-w-full overflow-x-hidden bg-[#102a43] px-6 py-12"
            >
                <motion.div
                    className="card mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-white/95 p-8 text-slate-900 shadow-2xl shadow-black/30 backdrop-blur"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    animate={
                        isHovered
                            ? { scale: 1}
                            : { y: [0, -8, 0], scale: 1.001}
                    }
                    transition={
                        isHovered
                            ? { duration: 0.8 }
                            : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    }
                >
                    <div className="mb-6 text-center">
                        <p className="mb-2 font-mono text-[15px] uppercase tracking-[0.3em] text-[#102a43]/60 text-center">
                            Sistema SIREC
                        </p>
                        <h2 className="font-mono text-[40px] font-semibold tracking-tight text-[#102a43] text-center">
                            LOGIN
                        </h2>
                    </div>

                    <div className="mb-6 rounded-xl p-3">
                        <RoleSelector value={selectedRole} onRoleChange={setSelectedRole} disabled={loading} />
                    </div>

                    <LoginFields onSubmit={handleLogin} loading={loading} error={error} />



                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500">
                        <button type="button" className="hover:text-[#102a43]" onClick={() => navigate('/forgot-password')}>
                            Recuperar contraseña
                        </button>
                        <button type="button" className="hover:text-[#102a43]">
                            Crear cuenta
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default Login;