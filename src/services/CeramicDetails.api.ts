import { flaskApi, springApi } from "../lib/axios";
import type { CeramicDetails, CeramicForm, Chat, ChatForm, UpdateChatForm } from "../types";
import { allChatSchema, ceramicDetailsSchema } from "../utils/ceramicDetails.schema";

export type CeramicDetailsApi = {
    formData: CeramicForm
    thread_id: string
    updateChatFormData: UpdateChatForm
    chatData: ChatForm,
}


//* Gets
export const submitCeramicDetails = async ({ formData }: Pick<CeramicDetailsApi, "formData">) => {
    try {
        const url = `/graimanchat`
        const formDataApi = new FormData();

        if (formData.thread_id) {
            formDataApi.append("thread_id", formData.thread_id);
        }

        if (formData.mensaje) {
            formDataApi.append("mensaje", formData.mensaje);
        }

        if (formData.imagen) {
            formDataApi.append("imagen", formData.imagen);
        }

        const { data } = await flaskApi.post(url, formDataApi, { headers: { "Content-Type": "multipart/form-data" } })

        const response = ceramicDetailsSchema.safeParse(data);
        if (!response.success) {
            console.error("Validation failed:", response.error);
            return {} as CeramicDetails;
        }
        return response.data;

    } catch (error) {
        console.log("Error getting ceramic details:", error);
        return {} as CeramicDetails;
    }
}

//* Chats
export const createChat = async ({ chatData }: Pick<CeramicDetailsApi, "chatData">) => {
    try {
        const url = `/api/chat`;
        await springApi.post(url, chatData);
    } catch (error) {
        console.log("Error creando chat:", error);
    }
}

export const updateConversation = async ({ thread_id, updateChatFormData }: Pick<CeramicDetailsApi, "thread_id" | "updateChatFormData">) => {
    try {
        const url = `/api/chat?threadId=${thread_id}`
        await springApi.patch(url, updateChatFormData)
    } catch (error) {
        console.log("Error actualizando:", error);
    }
}

export const getChatByThread = async ({ thread_id }: Pick<CeramicDetailsApi, "thread_id">) => {
    try {
        const ulr = `/api/chat?threadId=${thread_id}`
        const { data } = await springApi.get(ulr)
        const response = allChatSchema.safeParse(data);
        if (!response.success) {
            console.error("Validation failed:", response.error);
            return {} as Chat
        }
        return response.data[0]
    } catch (error) {
        console.log("Error obteniendo chat:", error);
        return {} as Chat
    }
}