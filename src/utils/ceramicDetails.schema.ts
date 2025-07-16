import { z } from 'zod';

export const ceramicDetailsSchema = z.object({
    respuesta: z.string(),
    thread_id: z.string(),
    Principal: z.string().or(z.null()),
    Otras: z.array(z.string()).nullable(),
});