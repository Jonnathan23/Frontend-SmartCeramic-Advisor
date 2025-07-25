import { useForm } from "react-hook-form";
import type { CeramicDetails, CeramicForm } from "../../types";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import MarkdownRenderer from "../MarkdownRenderer";

import 'react-image-crop/dist/ReactCrop.css'
import { useSubmitCeramicDetails } from "../../hooks/useCeramicDetails.use";
import { useCeramicChat, useCreateChat, useUpdateChat } from "../../hooks/useCeramicChat.use";
import { toast } from "react-toastify";

declare global {
    interface Window {
        webkitSpeechRecognition: typeof SpeechRecognition
        SpeechRecognition: typeof SpeechRecognition
    }
}

type CeramicChatProps = {
    ceramic: CeramicDetails | null
    setCeramic: Dispatch<SetStateAction<CeramicDetails | null>>
    textChat: string[]
    setTextChat: Dispatch<SetStateAction<string[]>>
    imageSrc: string
    setImageSrc: Dispatch<SetStateAction<string>>
}

export default function CeramicChat({ ceramic, setCeramic, textChat, setTextChat, imageSrc, setImageSrc }: CeramicChatProps) {

    const [imagesMain, setImagesMain] = useState<string[]>([]);
    const [listeningVoice, setListeningVoice] = useState(false)
    const recognitionRef = useRef<SpeechRecognition | null>(null)

    useEffect(() => {
        if (ceramic) {
            const images: string[] = ceramic.imagenPrincipal.filter((image: string | null) => image !== null) as string[];
            setImagesMain(images);
        }
    }, [ceramic])

    //* Form
    const { register, reset, handleSubmit, setValue, watch } = useForm<CeramicForm>()
    const mensajeValue = watch('mensaje')

    //* Voice Recognition setup
    useEffect(() => {
        const SpeechRecognitionConstructor: new () => SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognitionConstructor) {
            console.warn('Browser does not support SpeechRecognition')
            return
        }
        const recognitionInstance = new SpeechRecognitionConstructor()
        recognitionInstance.lang = 'es-ES'
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = false
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
            const transcript: string = event.results[event.results.length - 1][0].transcript
            setValue('mensaje', transcript)
        }
        recognitionInstance.onend = () => listeningVoice && recognitionInstance.start()
        recognitionRef.current = recognitionInstance
    }, [listeningVoice, setValue])

    //*hooks
    const { handleImageChange } = useCeramicChat({ setImageSrc, setValue })

    //* Mutations
    const { mutate: mutateCreateChat } = useCreateChat();
    const { mutate: mutateUpdateChat } = useUpdateChat();
    const { mutate, isPending } = useSubmitCeramicDetails({ setCeramic, textChat, setTextChat, setImageSrc, reset, setImagesMain, mutateCreateChat, mutateUpdateChat, })

    const handleSubmitCeramicDetails = (data: CeramicForm) => {
        // Determinar si es nueva conversación
        const isNewConversation = !(
            ceramic !== null &&
            typeof ceramic.thread_id === "string"
        )

        if (ceramic?.thread_id) {
            data.thread_id = ceramic.thread_id
        }

        if (!data.imagen && !data.mensaje) {
            toast.error("Debes escribir tu pregunta o subir una imagen")
            return
        }

        // Preparar texto de pregunta
        const question = data.mensaje ? data.mensaje : "Subiste una imagen"

        toast.loading("Enviando...")
        // Pasamos formData + las dos variables calculadas
        mutate({ formData: data, isNewConversation, question })
    }

    const handleScoreVoice = () => {
        if (recognitionRef.current && !listeningVoice) { recognitionRef.current.start(); setListeningVoice(true); }
        else if (recognitionRef.current && listeningVoice) { recognitionRef.current.stop(); setListeningVoice(false); }
    }

    return (
        <div className="all-chat">
            <div className="chat">

                {textChat.length === 0 ? (
                    <section className="ceramic-assistant">
                        <h2 className="ceramic-assistant__title">Asistente de Ceramicas</h2>
                        <p>
                            Este asistente te ayudara a encontrar la ceramica perfecta para tu hogar.
                            Puedes subir una imagen de la ceramica que te gusta y nosotros te ayudaremos a encontrarla.
                        </p>
                        <div>
                            <img src="logo_v5.png" width={200} alt="" />
                        </div>
                    </section>
                ) : (textChat.map((text, index) =>
                    <MarkdownRenderer key={index} content={text} principal={ceramic?.Principal} isLast={index === (textChat.length - 1)} images={imagesMain} confianza={ceramic?.probabilidadPrincipal} />
                ))}

            </div>
            <form className="ceramic-chat-form-container" onSubmit={handleSubmit(handleSubmitCeramicDetails)}>
                {imageSrc && (
                    <div className="image-preview-container">
                        <img className="image-preview" src={imageSrc} width={200} alt="preview" />
                    </div>
                )}
                <div className="chat-form">
                    <label htmlFor="message" className="chat-form__label">Pregúntanos</label>
                    <div className="input-container">
                        <input className="chat-form__input" type="text" {...register("mensaje")} placeholder="Escribe tu pregunta" value={mensajeValue} />
                        <div className="send-button-container">
                            <button type="submit" disabled={isPending} className="send-button button-chat">
                                {isPending ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <svg className="incon-chat" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#166ce5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                        <path d="M6.5 12h14.5" />
                                    </svg>
                                )}
                            </button>
                            <button type="button" disabled={isPending} className="send-button button-chat" onClick={() => handleScoreVoice()}>
                                {isPending ? (
                                    <div className="spinner"></div>
                                ) : (listeningVoice ?
                                    <svg
                                        className="incon-chat"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z" />
                                    </svg>

                                    :
                                    <svg
                                        className="incon-chat"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#166ce5"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 8a3 3 0 0 1 0 6" />
                                        <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
                                        <path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
                                    </svg>

                                )}
                            </button>
                            <label className='button-chat' htmlFor="image" >
                                <svg className="incon-chat" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#166ce5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 8h.01" />
                                    <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                                    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5" />
                                    <path d="M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526" />
                                    <path d="M19 22v-6" />
                                    <path d="M22 19l-3 -3l-3 3" />
                                </svg>

                            </label>
                            <input disabled={isPending} className='image-input-file' type="file" id="image" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                </div>
            </form >
        </div>
    );
}
