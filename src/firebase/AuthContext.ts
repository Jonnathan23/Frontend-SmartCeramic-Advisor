import { createContext } from 'react'
import type { User } from 'firebase/auth'

// Solo exporta el Contexto, sin componentes
export const AuthContext = createContext<{ currentUser: User | null }>({ currentUser: null })