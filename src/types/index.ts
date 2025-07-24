import { z } from 'zod';
import type { ceramicDetailsSchema } from '../utils/ceramicDetails.schema';
import type { loginSchema, signUpSchema, userSchema } from '../utils/auth.schema';


//* |-----------------| | CeramicDetails | |-----------------|

export type CeramicDetails = z.infer<typeof ceramicDetailsSchema>;

export type CeramicForm = {
    mensaje?: string;
    imagen?: File;
    thread_id?: string; //Nuevo --> enviar null
}


//* |-----------------| | Auth | |-----------------|

export type SignUpForm = z.infer<typeof signUpSchema>;
export type SaveUser = Pick<SignUpForm, "email" | "username"> & { id: string };

export type LoginForm = z.infer<typeof loginSchema>;

export type User = z.infer<typeof userSchema>;