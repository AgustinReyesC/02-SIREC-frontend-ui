import { type DragEvent, useRef, useState } from 'react'

interface PdfDropzoneProps {
    file: File | null
    error?: string
    disabled?: boolean
    onChange: (file: File | null) => void
}

function formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Zona para arrastrar o elegir el manuscrito en PDF. */
function PdfDropzone({ file, error, disabled = false, onChange }: PdfDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setIsDragging(false)
        if (disabled) return
        onChange(event.dataTransfer.files[0] ?? null)
    }

    const clear = () => {
        onChange(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    const borderClass = error
        ? 'border-red-400 bg-red-50/40'
        : isDragging
            ? 'border-sirec-navy bg-sirec-navy/5'
            : 'border-slate-300 hover:border-sirec-navy'

    return (
        <div>
            <label
                htmlFor="manuscrito"
                onDragOver={(event) => {
                    event.preventDefault()
                    if (!disabled) setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                aria-describedby={error ? 'manuscrito-error' : 'manuscrito-ayuda'}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${borderClass} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor"
                    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                    className="text-sirec-navy" aria-hidden="true">
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5" />
                    <path d="M12 17v-6M9.5 13.5 12 11l2.5 2.5" />
                </svg>
                {file ? (
                    <span className="break-all font-bold text-sirec-text">{file.name}</span>
                ) : (
                    <span className="text-sirec-text">
                        <span className="font-bold text-sirec-navy underline">Elige tu manuscrito</span> o arrástralo aquí
                    </span>
                )}
                <span id="manuscrito-ayuda" className="text-sm text-sirec-muted">
                    {file ? formatSize(file.size) : 'Solo PDF, máximo 10 MB'}
                </span>
                <input
                    ref={inputRef}
                    id="manuscrito"
                    name="file"
                    type="file"
                    accept="application/pdf,.pdf"
                    disabled={disabled}
                    className="sr-only"
                    onChange={(event) => onChange(event.target.files?.[0] ?? null)}
                />
            </label>

            {file && !disabled && (
                <button type="button" onClick={clear}
                    className="mt-2 cursor-pointer bg-transparent text-sm text-sirec-muted underline hover:text-sirec-text">
                    Quitar archivo
                </button>
            )}
            {error && (
                <p id="manuscrito-error" role="alert" className="mt-2 text-sm text-red-700">{error}</p>
            )}
        </div>
    )
}

export default PdfDropzone
