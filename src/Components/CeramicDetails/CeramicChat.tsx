import { useForm } from "react-hook-form";
import type { CeramicDetails, CeramicForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { submitCeramicDetails } from "../../services/CeramicDetails.api";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";

type CeramicChatProps = {
    ceramic: CeramicDetails | null
    setCeramic: Dispatch<SetStateAction<CeramicDetails | null>>
    textChat: string[]
    setTextChat: Dispatch<SetStateAction<string[]>>
}

export default function CeramicChat({ ceramic, setCeramic, textChat, setTextChat }: CeramicChatProps) {

    const { register, reset, handleSubmit, setValue } = useForm<CeramicForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: submitCeramicDetails,
        onSuccess: (data) => {
            toast.success("Descripcion enviada correctamente");
            if (!data) return;

            setCeramic(data);
            const newMessage = [data.respuesta, ...textChat];
            setTextChat(newMessage);

            localStorage.removeItem('ceramic');
            localStorage.removeItem('textChat');

            localStorage.setItem('ceramic', JSON.stringify(data));
            localStorage.setItem('textChat', JSON.stringify(newMessage));

            reset();
        },
        onError: () => {
            toast.error("Error al enviar la descripcion");
        }
    })

    const handleSubmitCeramicDetails = (data: CeramicForm) => {
        if (ceramic && ceramic.thread_id) {
            data.thread_id = ceramic.thread_id
        }
        mutate({ formData: data });
    }

    return (
        <form className="ceramic-container" onSubmit={handleSubmit(handleSubmitCeramicDetails)}>
        </form >
    );
}
