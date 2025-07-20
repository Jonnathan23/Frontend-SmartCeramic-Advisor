import { useContext } from 'react'
import { AuthContext } from '../firebase/AuthContext'

// Hook que “consume” el Contexto
export function useAuth() {
    return useContext(AuthContext)
}
