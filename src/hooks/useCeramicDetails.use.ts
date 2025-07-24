import { useMutation } from "@tanstack/react-query";
import { submitCeramicDetails } from "../services/CeramicDetails.api";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";
import type { CeramicDetails, CeramicForm } from "../types";
import type { UseFormReset } from "react-hook-form";
import { updateCeramicDetailsStorage } from "../utils/utils";

type UseCeramicDetailsProps = {
    setCeramic: Dispatch<SetStateAction<CeramicDetails | null>>
    textChat: string[]
    setTextChat: Dispatch<SetStateAction<string[]>>
    setImageSrc: Dispatch<SetStateAction<string>>
    reset: UseFormReset<CeramicForm>
    setImagesMain: Dispatch<SetStateAction<string[]>>    
}


export const useSubmitCeramicDetails = ({ setCeramic, textChat, setTextChat, setImageSrc, reset, setImagesMain }: Pick<UseCeramicDetailsProps, "setCeramic" | "textChat" | "setTextChat" | 'setImageSrc' | 'reset' | 'setImagesMain'>) => {
    return useMutation({
        mutationFn: submitCeramicDetails,
        onSuccess: (data) => {
            toast.dismiss();
            if (!data) return;
            toast.success("Descripcion enviada correctamente");

            const newMessage = [data.respuesta, ...textChat];
            setCeramic(data);
            setTextChat(newMessage);
            const images: string[] = data.imagenPrincipal.filter((image: string | null) => image !== null) as string[];
            setImagesMain(images);

            updateCeramicDetailsStorage(data, newMessage);
            setImageSrc('');
            reset();
        },
        onError: () => {
            toast.dismiss();
            toast.error("Error al enviar la descripcion");
        }
    })
}