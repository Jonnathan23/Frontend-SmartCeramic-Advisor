import { useForm } from "react-hook-form";
import type { CeramicDetails, CeramicForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { submitCeramicDetails } from "../../services/CeramicDetails.api";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";
import MarkdownRenderer from "../MarkdownRenderer";

import React, { useState, useRef, useCallback, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import type { PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


type CeramicChatProps = {
    ceramic: CeramicDetails | null
    setCeramic: Dispatch<SetStateAction<CeramicDetails | null>>
    textChat: string[]
    setTextChat: Dispatch<SetStateAction<string[]>>
}

export default function CeramicChat({ ceramic, setCeramic, textChat, setTextChat }: CeramicChatProps) {
    const [imageSrc, setImageSrc] = useState<string>('')
    //const [croppedFile, setCroppedFile] = useState<File | null>(null)
    const [isCroppingMode, setIsCroppingMode] = useState<boolean>(false)
    const [percentCrop, setPercentCrop] = useState<PercentCrop>({ unit: '%', x: 0, y: 0, width: 100, height: 100 })
    const [pixelCrop, setPixelCrop] = useState<PixelCrop | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const previewUrl = reader.result as string
            setImageSrc(previewUrl)
            setPercentCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 })
            setPixelCrop(null)
            setIsCroppingMode(false)
            // setCroppedFile(file)
            setValue('imagen', file)
        }
        reader.readAsDataURL(file)
    }

    //* Form
    const { register, reset, handleSubmit, setValue } = useForm<CeramicForm>();

    //* Mutations
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

            setImageSrc('');
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
        console.log(data);
        mutate({ formData: data });
    }

    return (
        <div className="all-chat">
            <div className="chat">
                {textChat.map((text, index) =>
                    <MarkdownRenderer key={index} content={text} principal={ceramic?.Principal} isLast={index === (textChat.length - 1)} />
                )}

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
                        <input className="chat-form__input" type="text" {...register("mensaje")} placeholder="Escribe tu pregunta" />
                        <div className="send-button-container">
                            <button type="submit" disabled={isPending} className="send-button button-chat">
                                {isPending ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <svg className="incon-chat" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#166ce5" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                        <path d="M6.5 12h14.5" />
                                    </svg>
                                )}
                            </button>
                            <label className='button-chat' htmlFor="image" >
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
