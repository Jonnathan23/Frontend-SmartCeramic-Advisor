import { flaskApi } from "../lib/axios";
import type { CeramicDetails, CeramicForm } from "../types";
import { ceramicDetailsSchema } from "../utils/ceramicDetails.schema";

export type CeramicDetailsApi = {
    formData: CeramicForm
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
        return response.data

    } catch (error) {
        console.log("Error getting ceramic details:", error);
    }
}