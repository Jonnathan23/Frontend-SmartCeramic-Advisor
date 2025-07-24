import type { UseMutateFunction } from "@tanstack/react-query"
import { springApi } from "../lib/axios"
import type { LoginForm, SaveUser, SignUpForm, User, UserFirebase } from "../types"
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebaseAuth } from "../firebase/firebaseConfig"
import type { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"
import { userSchema } from "../utils/auth.schema"
import { FirebaseError } from 'firebase/app'

export type UserApi = {
    formData: SignUpForm
    saveUser: SaveUser
    loginData: LoginForm
    loginID: User['idFirebase']
    mutate: UseMutateFunction<string | undefined, Error, Pick<UserApi, "saveUser">, unknown>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    userId: User['id']
}


//** SingUp 

/**
 * @description Funcion para registrar un nuevo usuario en la base de datos
 * @param {UserApi} { formData }
 * @returns 
 */
export const signUp = async ({ saveUser }: Pick<UserApi, "saveUser">) => {
    try {
        const url = `/api/users`;
        await springApi.post(url, saveUser);
        return "Registrado correctamente";
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
        const userName = credential.user.displayName ?? username

        const saveUser: SaveUser = {
            idFirebase: credential.user.uid,            
            username: userName,
            threads: []
        }
        mutate({ saveUser });

    } catch (error) {
        console.log("Error registrando con firebase:", error)
        toast.dismiss(toastId)
        if (error instanceof FirebaseError) {
            toast.error(error.message)
            return
        }
        // fallback para errores inesperados
        toast.error("Error desconocido al registrar")
    } finally {
        setIsLoading(false)
    }
}


//* Login
export const getUser = async ({ loginID }: Pick<UserApi, "loginID">) => {
    try {
        const url = `/api/users/firebase/${loginID}`;
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

        const idToken = await getIdToken(credential.user, true)
        const loginUser: UserFirebase = {
            idFirebase: credential.user.uid,            
            username: credential.user.displayName ?? ''
        }

        // 4. Retornar todo para tu mutación
        localStorage.setItem('user', JSON.stringify(loginUser))
        localStorage.setItem('token', idToken)
        console.log('Login exitoso', loginUser, idToken);
        return true
    } catch (error) {
        console.log("Error iniciando sesión:", error);
        toast.dismiss(toastId)
        toast.error('Credenciales inválidas')
        setIsLoading(false)
        return false
    } finally {
        setIsLoading(false)
    }

}


//* Patch
