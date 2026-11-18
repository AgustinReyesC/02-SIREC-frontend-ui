import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface LoginFieldsProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
    loading?: boolean
    error?: string | null
}

function LoginFields({ onSubmit, loading = false, error = null }: LoginFieldsProps) {
    const [showPassword, setShowPassword] = useState(false)

    // A dónde ir después del login lo decide la página, no el formulario
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await onSubmit(event)
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            <div className="space-y-2">
                <label
                    htmlFor="correo"
                    className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-900"
                >
                    Correo
                </label>
                <motion.input
                    id="correo"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Ingresa tu correo"
                    whileHover={{ y: -1 }}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-500 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/10"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-900"
                >
                    Contraseña
                </label>

                <div className="relative">
                    <motion.input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        placeholder="Ingresa tu contraseña"
                        whileHover={{ y: -1 }}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-950 shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-500 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/10"
                    />

                    <motion.button
                        type="button"
                        aria-label="Mostrar u ocultar contraseña"
                        aria-controls="password"
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((visible) => !visible)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute inset-y-0 right-0 px-4 text-slate-500 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/30"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {error && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                </p>
            )}

            <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="w-full rounded-xl bg-slate-950 px-4 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-slate-950/15 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-950/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? 'Entrando...' : 'Iniciar sesión'}
            </motion.button>
        </motion.form>
    )
}

export default LoginFields
