import { z } from 'zod';
import type { ceramicDetailsSchema } from '../utils/ceramicDetails.schema';


//* |-----------------| | CeramicDetails | |-----------------|

export type CeramicDetails = z.infer<typeof ceramicDetailsSchema>;

export type CeramicForm = {
    mensaje?: string;
    imagen?: File;
    thread_id?: string; //Nuevo --> enviar null
}