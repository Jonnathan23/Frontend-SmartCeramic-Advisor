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
}


export const useSubmitCeramicDetails = ({ setCeramic, textChat, setTextChat, setImageSrc, reset }: Pick<UseCeramicDetailsProps, "setCeramic" | "textChat" | "setTextChat" | 'setImageSrc' | 'reset'>) => {
    return useMutation({
        mutationFn: submitCeramicDetails,
        onSuccess: (data) => {
            toast.success("Descripcion enviada correctamente");
            if (!data) return;

            const newMessage = [data.respuesta, ...textChat];
            setCeramic(data);
            setTextChat(newMessage);

            updateCeramicDetailsStorage(data, newMessage);
            setImageSrc('');
            reset();
        },
        onError: () => {
            toast.error("Error al enviar la descripcion");
        }
    })
}