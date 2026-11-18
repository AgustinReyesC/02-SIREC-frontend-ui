import { isAxiosError } from 'axios'
import type { LoginRole } from '../assets/constants'
import { api } from './api'

export interface LoginInput {
    mail: string
    password: string
    role: LoginRole
}

/** Respuesta 200 de POST /auth/login. */
export interface LoginResponse {
    accessToken: string
    user: {
        uid: number
        mail: string
        name: string
        role: LoginRole
    }
}

export async function loginRequest(input: LoginInput): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', input)
    return data
}

/** Mensaje para mostrar cuando el login falla. */
export function loginErrorMessage(error: unknown): string {
    if (!isAxiosError(error) || !error.response) {
        return 'No se pudo conectar con el servidor. Revisa que el backend esté corriendo.'
    }
    const raw = (error.response.data as { message?: string | string[] } | undefined)?.message
    const message = Array.isArray(raw) ? raw[0] : raw
    switch (error.response.status) {
        case 400:
            return message ?? 'Revisa el correo y la contraseña.'
        case 401:
            return 'Correo o contraseña incorrectos.'
        case 403:
            return message ?? 'No puedes entrar con ese rol.'
        default:
            return 'Ocurrió un error inesperado. Intenta de nuevo.'
    }
}
