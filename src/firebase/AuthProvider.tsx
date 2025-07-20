import { useEffect, useState, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from './firebaseConfig'
import { AuthContext } from './AuthContext'

// Solo exporta el componente Proveedor
export default function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    useEffect(() => onAuthStateChanged(firebaseAuth, user => setCurrentUser(user)), [])
    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}
