/** Roles con los que se puede iniciar sesión (los mismos nombres que la tabla roles). */
export const roles = [
    { value: 'author', label: 'Autor' },
    { value: 'reviewer', label: 'Revisor' },
    { value: 'administrator', label: 'Administrador' },
] as const

export type LoginRole = typeof roles[number]['value']

export const rolesAsDictionary = {
    AUTHOR: 'author',
    REVIEWER: 'reviewer',
    ADMINISTRATOR: 'administrator',
} as const satisfies Record<string, LoginRole>
