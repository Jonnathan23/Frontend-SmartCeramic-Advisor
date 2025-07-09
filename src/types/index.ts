import { z } from 'zod';
import type { ceramicChatSchema, ceramicDetailsSchema, productsSchema } from '../utils/ceramicDetails.schema';


//* |-----------------| | CeramicDetails | |-----------------|

export type CeramicDetails = z.infer<typeof ceramicDetailsSchema>;
export type Products = z.infer<typeof productsSchema>;
export type CeramicChat = z.infer<typeof ceramicChatSchema>

export type CeramicImageForm = {
    imagen: File;
}

export type CeramicChatForm = {
    mensaje: string;
    thread_id?: string; //Nuevo --> enviar null
}