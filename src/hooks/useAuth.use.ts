import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import type { UseFormReset } from 'react-hook-form'

import { AuthContext } from '../firebase/AuthContext'
import { signUp } from '../services/UserService.api'
import type { SignUpForm } from '../types'

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


