import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { UseFormReset } from 'react-hook-form'

import { AuthContext } from '../firebase/AuthContext'
import { getUser, signUp } from '../services/UserService.api'
import type { SignUpForm, User } from '../types'

/**
 * @description Hook que “consume” el Contexto
 * @returns {AuthContext}
 */
export function useAuth() {
    return useContext(AuthContext)
}

export const useSignUp = (reset: UseFormReset<SignUpForm>) => {
    return useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            toast.dismiss();
            toast.success(data);
            reset();
        },
        onError: () => {
            toast.dismiss();
            toast.error("Error al registrarse")
        },
    })
}


export const useLogin = (loginID: User['id']) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser({ loginID }),
        enabled: !!loginID
    })
}