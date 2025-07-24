import { z } from 'zod';

export const othersCeramicsSchema = z.object({
    nombre: z.string(),
    imagenes: z.array(z.string()),
    probabilidad: z.number()
})

export const ceramicDetailsSchema = z.object({
    respuesta: z.string(),
    thread_id: z.string(),
    Principal: z.string().or(z.null()),
    imagenPrincipal: z.array(z.string().or(z.null())),
    probabilidadPrincipal: z.number().or(z.null()),
    Otras: z.array(othersCeramicsSchema)
});

export const chatSchema = z.object({
    id: z.number(),
    threadId: z.string(),
    questions: z.array(z.string()),
    answers: z.array(z.string()),
})

export const allChatSchema = z.array(chatSchema)