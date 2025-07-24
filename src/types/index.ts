import { z } from 'zod';
import type { ceramicDetailsSchema, chatSchema } from '../utils/ceramicDetails.schema';
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
export type SaveUser = Pick<SignUpForm, | "username"> & { idFirebase: string, threads: string[] };
export type UserFirebase = Pick<SignUpForm, | "username"> & { idFirebase: string };

export type LoginForm = z.infer<typeof loginSchema>;

export type User = z.infer<typeof userSchema>;


//* |-----------------| | Firabase | |-----------------|
export type errorResponse = {
    error: {
        code: number,
        message: string,
    }
}

//* |-----------------| | Chats | |-----------------|
export type Chat = z.infer<typeof chatSchema>;
export type UpdateChatForm = Pick<Chat, "questions" | "answers">
export type ChatForm = {
    threadId: string,
    question: string,
    answer: string
}