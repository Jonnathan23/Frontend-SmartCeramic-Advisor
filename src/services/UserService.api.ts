import type { UseMutateFunction } from "@tanstack/react-query"
import { springApi } from "../lib/axios"
import type { LoginForm, SaveUser, SignUpForm, User } from "../types"
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebaseAuth } from "../firebase/firebaseConfig"
import type { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"
import { userSchema } from "../utils/auth.schema"
import { useLogin } from "../hooks/useAuth.use"

export type UserApi = {
    formData: SignUpForm
    saveUser: SaveUser
    loginData: LoginForm
    loginID: User['id']
    mutate: UseMutateFunction<string | undefined, Error, Pick<UserApi, "saveUser">, unknown>
    setIsLoading: Dispatch<SetStateAction<boolean>>
}


//** SingUp 

/**
 * @description Funcion para registrar un nuevo usuario en la base de datos
 * @param {UserApi} { formData }
 * @returns 
 */
export const signUp = async ({ saveUser }: Pick<UserApi, "saveUser">) => {
    try {
        const url = `/sign-up`;
        const { data } = await springApi.post<string>(url, saveUser);
        return data
    } catch (error) {
        console.log("Error registrando:", error);
        toast.error('Error al registrarse')
    }
}

/**
 * @description Funcion para registrarse con firebase
 * @param {UserApi} { formData, mutate }
 */
export const submitSignUpFirebase = async ({ formData, mutate, setIsLoading }: Pick<UserApi, "formData" | "mutate" | 'setIsLoading'>) => {
    const { email, password, username } = formData
    const toastId = toast.loading('Registrando usuario…')
    setIsLoading(true)
    try {
        const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        await updateProfile(credential.user, { displayName: username })
        const useEmail = credential.user.email ?? email
        const userName = credential.user.displayName ?? username

        const saveUser: SaveUser = {
            id: credential.user.uid,
            email: useEmail,
            username: userName
        }
        mutate({ saveUser });

    } catch (error) {
        console.log("Error registrando con firebase:", error);
        toast.error('Error al registrarse', { toastId })

    } finally {
        setIsLoading(false)
    }
}


//* Login
export const getUser = async ({ loginID }: Pick<UserApi, "loginID">) => {
    try {
        const url = `/sign-in/${loginID}`;
        const { data } = await springApi.get(url);
        const response = userSchema.safeParse(data);
        if (!response.success) {
            toast.error('Error de tipado')
            return {} as User
        }
        return response.data
    } catch (error) {
        console.log("Error iniciando sesión:", error);
    }
}


export const loginFirebase = async ({ loginData, setIsLoading }: Pick<UserApi, "loginData" | 'setIsLoading'>) => {
    const { email, password } = loginData
    setIsLoading(true)
    const toastId = toast.loading('Iniciando sesión…')

    try {
        // 1. Autenticación en Firebase
        const credential = await signInWithEmailAndPassword(firebaseAuth, email, password)
        // 2. Obtener token para backend
        const idToken = await getIdToken(credential.user, true)
        // 3. Preparar payload
        const user: SaveUser = {
            id: credential.user.uid,
            email: credential.user.email!,
            username: credential.user.displayName ?? ''
        }

        const { data } = useLogin({ loginID: user.id })

    } catch (error) {
        console.error('Error en Firebase login:', error)
        toast.error('Credenciales inválidas', { id: toastId })
    } finally {
        setIsLoading(false)
    }
}