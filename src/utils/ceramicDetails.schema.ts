import { array, object, string, z } from 'zod';

export const ceramicDetailsSchema = object({
    respuesta: string(),
    thread_id: string(),
    Principal: string().or(z.null()),
    Otras: array(string()),
});