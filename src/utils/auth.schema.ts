import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string(),
    threads: z.array(z.string())
})