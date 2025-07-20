import type { UseMutateFunction } from "@tanstack/react-query"
import { springApi } from "../lib/axios"
import type { LoginForm, SaveUser, SignUpForm } from "../types"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebaseAuth } from "../firebase/firebaseConfig"
import type { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"

export type UserApi = {
    formData: SignUpForm
    saveUser: SaveUser
    loginData: LoginForm
    mutate: UseMutateFunction<string | undefined, Error, Pick<UserApi, "saveUser">, unknown>
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

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