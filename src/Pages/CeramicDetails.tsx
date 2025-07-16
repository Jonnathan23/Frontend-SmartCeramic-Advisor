import { useEffect, useState } from "react";
import ImageSubmit from "../Components/CeramicDetails/ImageSubmit";
import type { CeramicDetails, CeramicForm } from "../types";
import MarkdownRenderer from "../Components/MarkdownRenderer";
import { useMutation } from "@tanstack/react-query";
import { submitCeramicDetails } from "../services/CeramicDetails.api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { isThereOthersCeramics } from "../utils/policies";
import OtherCeramic from "../Components/CeramicDetails/OtherCeramic";

export default function CeramicDetails() {
    const [ceramic, setCeramic] = useState<CeramicDetails | null>(null);
    const [textChat, setTextChat] = useState<string[]>([]);


    useEffect(() => {
        const ceramicStorage = localStorage.getItem('ceramic');
        const textChatStorage = localStorage.getItem('textChat');
        if (ceramicStorage) {
            setCeramic(JSON.parse(ceramicStorage));
        }

        if (textChatStorage) {
            setTextChat(JSON.parse(textChatStorage));
        }

    }, [])

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
        //console.log(data);
    }


    return (
        <>
            <form className="ceramic-container" onSubmit={handleSubmit(handleSubmitCeramicDetails)}>
                <div className="ceramic-assistant">
                    <h2 className="ceramic-assistant__title">Asistente de Ceramicas</h2>
                    <p>Encontrar la ceramica perfecta</p>
                    <p>
                        Este asistente te ayudara a encontrar la ceramica perfecta para tu hogar.
                        Puedes subir una imagen de la ceramica que te gusta y nosotros te ayudaremos a encontrarla.
                    </p>
                    <ImageSubmit setValue={setValue} reset={reset} />
                </div>

                <div className="ceramic-chat">
                    <h3 className="ceramic-assistant__title">Chat</h3>
                    <div className="ceramic-chat__input">
                        <label htmlFor="mensaje">Preguntanos</label>
                        <div className="ceramic-chat__input__container">
                            <input className="ceramic-chat__input__field" type="text" placeholder="Ej. ¿Que formatos hay?"
                                {...register("mensaje")}
                            />
                            <button className="ceramic__button" type="submit">{isPending ? "Enviando..." :
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffffff"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                    <path d="M6.5 12h14.5" />
                                </svg>

                            }</button>
                        </div>
                    </div>                    
                    <div className="ceramic-chat__messages">
                        {textChat.map((message, index) =>
                            <MarkdownRenderer key={index} content={message} principal={ceramic?.Principal} isFirts={index === 0} />
                        )}
                    </div>
                </div>
            </form>
            {isThereOthersCeramics(ceramic) && (<>
                <h3 className="ceramic-assistant__title--others">Otras Ceramicas</h3>
                <div className="container-others">
                    {ceramic?.Otras && ceramic.Otras.map((ceramic, index) => (
                        <OtherCeramic key={index} ceramic={ceramic} />
                    ))}
                </div>
            </>)}
        </>
    );
}
