
//* Gets

import { flaskApi } from "../lib/axios";
import type { CeramicChat, CeramicChatForm, CeramicDetails, CeramicImageForm } from "../types";
import { ceramicChatSchema, ceramicDetailsSchema } from "../utils/ceramicDetails.schema";

export type CeramicDetailsApi = {
    ceramicImageForm: CeramicImageForm;
    formData: CeramicChatForm
}


//* Posts

export const submitImage = async ({ ceramicImageForm }: Pick<CeramicDetailsApi, "ceramicImageForm">) => {
    try {
        const url = `/ceramica`;
        const formData = new FormData();
        formData.append("file", ceramicImageForm.imagen);

        const { data } = await flaskApi.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Importante para enviar archivos
            },
        });

        const response = ceramicDetailsSchema.safeParse(data);
        if (!response.success) {
            console.error("Validation failed:", response.error);
            return {} as CeramicDetails;
        }

        return response.data;
    } catch (error) {
        console.log("Error submitting image:", error);
    }
}

export const submitCeramicDescription = async ({ formData }: Pick<CeramicDetailsApi, "formData">) => {
    try {
        const url = `/ceramica`;
        const { data } = await flaskApi.post(url, formData)
        const response = ceramicChatSchema.safeParse(data);
        if (!response.success) {
            console.error("Validation failed:", response.error);
            return {} as CeramicChat;
        }
        return response.data;
    } catch (error) {
        console.log("Error submitting ceramic description:", error);
    }
}