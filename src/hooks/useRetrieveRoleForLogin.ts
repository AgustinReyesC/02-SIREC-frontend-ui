import { useState } from 'react'

export type LoginRole = 'autor' | 'manager' | 'revisor'

interface Credentials {
    email: string
    password: string
    role: string
}

interface RoleResponse {
    role: LoginRole
}

export function useRetrieveRoleForLogin() {
    const [role, setRole] = useState<LoginRole | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function retrieveRoleForLogin(credentials: Credentials) {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/auth/role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                throw new Error('No se pudo obtener el rol')
            }

            const data: RoleResponse = await response.json()
            setRole(data.role)

            return data.role
        } catch (requestError) {
            const message =
                requestError instanceof Error
                    ? requestError.message
                    : 'Error inesperado'

            setError(message)
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        role,
        loading,
        error,
        retrieveRoleForLogin,
    }
}
