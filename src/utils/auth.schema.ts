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
    id: z.number(),
    username: z.string(),
    idFirebase: z.string(),
    threads: z.array(z.string())   

})

/* iniciar sesion
get 
{
    id: z.string(),    
    username: string
    threads: []
}

a.threads[0]
b.threads[1]
c.threads[2]


get by id Conversation -->
{
    id: threads
    questions:[]
    answers:[]
}


post create conversation
{
    id: z.string(),
    questions:[]
    answers:[]
}


*/