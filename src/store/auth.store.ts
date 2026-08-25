import { create } from "zustand"
import { persist } from "zustand/middleware"   

interface User {
    uid: number,
    mail: string,
    roles: string[],
    isOwner?: boolean
}

interface AuthState {
    token: string | null,
    user: User | null,
    isAuthenticated: boolean,
    login: (token: string, user: User) => boolean,
    logout: () => void,
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            login: ( token, user ) => {
                set({token, user, isAuthenticated: true});
                return true;
            },  
            logout: () => {
                set({
                    isAuthenticated: false,
                    token: null,
                    user: null,
                })

                localStorage.removeItem('token')
            }
        }),
        {
            name: 'sirec-auth',
        }
    )
)
