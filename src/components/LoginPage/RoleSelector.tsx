import { roles, type LoginRole } from '../../assets/constants'

interface RoleSelectorProps {
    value: LoginRole
    onRoleChange: (role: LoginRole) => void
    disabled?: boolean
}

/** Rol con el que se entra; el backend valida que el usuario lo tenga. */
function RoleSelector({ value, onRoleChange, disabled = false }: RoleSelectorProps) {
    return (
        <div
            className="flex w-full flex-wrap rounded-full bg-amber-50 p-2 shadow-xl"
            role="radiogroup"
            aria-label="Entrar como"
        >
            {roles.map((role) => (
                <button
                    key={role.value}
                    type="button"
                    role="radio"
                    aria-checked={value === role.value}
                    disabled={disabled}
                    onClick={() => onRoleChange(role.value)}
                    className={`m-1 flex-1 cursor-pointer rounded-full px-3 py-2 font-sans text-[13px] uppercase tracking-wider transition-colors sm:text-[15px] ${
                        value === role.value
                            ? 'bg-[#102a43] text-white shadow-sm'
                            : 'text-[#102a4370] hover:bg-[#102a4320] hover:text-[#102a43ff]'
                    }`}
                >
                    {role.label}
                </button>
            ))}
        </div>
    )
}

export default RoleSelector
