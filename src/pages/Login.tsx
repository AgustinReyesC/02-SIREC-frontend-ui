import '../styles/Login.css'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import RoleSelector from '../components/LoginPage/RoleSelector'
import LoginFields from '../components/LoginPage/auth_forms/login/LoginFields'
import { rolesAsDictionary } from '../assets/constants'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

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

    const [selectedRole, setSelectedRole] = useState(rolesAsDictionary.AUTHOR)
    // const {
    //     role,
    //     loading,
    //     error,
    //     retrieveRoleForLogin,
    // } = useRetrieveRoleForLogin() //not yet

    // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    //     event.preventDefault()

    //     const formData = new FormData(event.currentTarget)

    //     await retrieveRoleForLogin({
    //         email: String(formData.get('email')),
    //         password: String(formData.get('password')),
    //         role: selectedRole,
    //     })
    // } //not yet

    const { login } = useAuthStore()

    const handleLogin = () => {
        login('token', {
            uid: 10,
            mail: 'pruebaSirec@gmail.com',
            roles: ['autor', 'revisor'],
            isOwner: false,
        })
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
                        <RoleSelector onRoleChange={setSelectedRole} />
                    </div>

                    <LoginFields onSubmit={handleLogin} />
                    {/* {error && <p className="text-red-900">{error}</p>}
                    {role && <p>Rol detectado: {role}</p>} */}



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