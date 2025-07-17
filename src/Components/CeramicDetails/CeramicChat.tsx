import { useForm } from "react-hook-form";
import type { CeramicDetails, CeramicForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { submitCeramicDetails } from "../../services/CeramicDetails.api";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";
import MarkdownRenderer from "../MarkdownRenderer";

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
        <div>
            <div>
                {textChat.map((text, index) =>
                    <MarkdownRenderer key={index} content={text} principal={ceramic?.Principal} isFirts={index === 0} />
                )}


            </div>
            <form className="ceramic-container" onSubmit={handleSubmit(handleSubmitCeramicDetails)}>
                <div>
                    <label htmlFor="message">Preguntanos</label>
                    <div>
                        <input type="text" {...register("mensaje")} />
                        <button disabled={isPending}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                <path d="M6.5 12h14.5" />
                            </svg>

                        </button>
                    </div>
                </div>

            </form >
        </div>
    );
}
