import { z } from 'zod';

export const ceramicDetailsSchema = z.object({
    respuesta: z.string(),
    thread_id: z.string(),
    Principal: z.string().or(z.null()),

    Otras: z.array(z.string()).nullable(),
});


export const newceramicDetailsSchema = z.object({
    respuesta: z.string(),
    thread_id: z.string(),
    Principal: z.string().or(z.null()),
    imagenPrincipal: z.array(z.string().or(z.null())),
    Otras: z.array(z.object({
        nombre: z.string(),
        imagen: z.string()
    })),
});
