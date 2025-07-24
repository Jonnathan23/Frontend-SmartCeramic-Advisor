import { z } from 'zod';
import { string } from 'zod/v4';

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
    imagenPrincipal: z.string().or(z.null()),

    //Otras: z.array(z.string()).nullable(),
    Otras: z.array(z.object({
        nombre: string(),
        imagen: string()
    }))
});
