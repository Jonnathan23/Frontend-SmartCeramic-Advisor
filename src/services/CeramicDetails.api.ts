
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
        // 1. Ajustamos la ruta a /ceramicas (plural)
        const url = `/ceramicas`;
        const formData = new FormData();
        // 2. El campo debe llamarse "imagen" para que FastAPI lo reconozca
        formData.append("imagen", ceramicImageForm.imagen);

        const { data } = await flaskApi.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
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
};

export const submitCeramicDescription = async ({
    formData,
}: Pick<CeramicDetailsApi, "formData">) => {
    try {
        const url = `/graiman/sqlchat`;  // Asegúrate de las backticks o comillas
        // Construimos FormData para que FastAPI lo reciba como Form(...)
        const fd = new FormData();
        fd.append("mensaje", formData.mensaje);
        if (formData.thread_id) {
            fd.append("thread_id", formData.thread_id);
        }

        const { data } = await flaskApi.post(url, fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const response = ceramicChatSchema.safeParse(data);
        if (!response.success) {
            console.error("Validation failed:", response.error);
            return {} as CeramicChat;
        }
        return response.data;
    } catch (error) {
        console.log("Error submitting ceramic description:", error);
    }
};
