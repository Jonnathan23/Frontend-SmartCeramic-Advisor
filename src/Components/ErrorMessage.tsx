import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <div className="text-center bg-red-100 text-red-600 font-bold p-3 uppercase text-sm">
            {children}
        </div>
    )
}