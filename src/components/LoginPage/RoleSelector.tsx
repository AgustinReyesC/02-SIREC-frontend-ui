import { useState } from 'react'
import {roles} from '../../assets/constants'

export type Role = typeof roles[number]

interface RoleSelectorProps {
    onRoleChange?: (role: Role) => void
}

function RoleSelector({ onRoleChange }: RoleSelectorProps) {
    const [selectedRole, setSelectedRole] = useState<Role>('revisor')

    function selectRole(role: Role) {
        setSelectedRole(role)
        onRoleChange?.(role)
    }

    return (
        <div
            className="flex w-full rounded-full bg-amber-50 p-2  shadow-xl"
            role="tablist"
            aria-label="Seleccionar rol"
        >
            {roles.map((role) => (
                <button
                    key={role}
                    type="button"
                    role="tab"
                    aria-selected={selectedRole === role}
                    onClick={() => selectRole(role)}
                    className={`flex-1 rounded-full px-3 py-2 font-sans text-[15px] uppercase tracking-wider transition-colors m-1 ${
                        selectedRole === role
                            ? 'bg-[#102a43] text-white shadow-sm'
                            : 'text-[#102a4370] hover:text-[#102a43ff] hover:bg-[#102a4320]'
                    }`}
                >
                    {role}
                </button>
            ))}
        </div>
    )
}

export default RoleSelector
