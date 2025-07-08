
//* Gets

import { flaskApi } from "../lib/axios";
import type { CeramicDetails } from "../types";
import { ceramicDetailsSchema } from "../utils/ceramicDetails.schema";

export type CeramicDetailsApi = {
    file: File;
    description: string;
}


//* Posts

export const submitImage = async ({ file }: Pick<CeramicDetailsApi, "file">) => {
    try {
        const url = `/ceramica`;
        const formData = new FormData();
        formData.append("file", file);

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

export const submitCeramicDescription = async ({ description }: Pick<CeramicDetailsApi, "description">): Promise<CeramicDetails | undefined> => {
    try {
        const url = `/ceramica`;
        const { data } = await flaskApi.post(url, { description })
        const response = ceramicDetailsSchema.safeParse(data);
        if (!response.success) {
            console.error("Validation failed:", response.error);
            return {} as CeramicDetails;
        }
        return response.data;
    } catch (error) {
        console.log("Error submitting ceramic description:", error);
    }
}