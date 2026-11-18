import { rolesAsDictionary } from '../assets/constants'

/** La sesión lleva el rol con que se entró (POST /auth/login). */
export function isAuthor(roles: string[] | undefined | null): boolean {
    return !!roles?.includes(rolesAsDictionary.AUTHOR)
}
