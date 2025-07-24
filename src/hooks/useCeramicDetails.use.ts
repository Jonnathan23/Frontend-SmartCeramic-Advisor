import { useMutation, type UseMutateFunction, type UseMutationResult } from "@tanstack/react-query";
import { submitCeramicDetails, type CeramicDetailsApi } from "../services/CeramicDetails.api";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";
import type { CeramicDetails, CeramicForm, ChatForm, UpdateChatForm } from "../types";
import type { UseFormReset } from "react-hook-form";
import { updateCeramicDetailsStorage } from "../utils/utils";

type UseCeramicDetailsProps = {
    setCeramic: Dispatch<SetStateAction<CeramicDetails | null>>
    textChat: string[]
    setTextChat: Dispatch<SetStateAction<string[]>>
    setImageSrc: Dispatch<SetStateAction<string>>
    reset: UseFormReset<CeramicForm>
    setImagesMain: Dispatch<SetStateAction<string[]>>
    mutateCreateChat: UseMutateFunction<void, Error, Pick<CeramicDetailsApi, "chatData">, unknown>
    mutateUpdateChat: UseMutateFunction<void, Error, Pick<CeramicDetailsApi, "thread_id" | "updateChatFormData">, unknown>
}

type SubmitVars = {
    formData: CeramicForm
    isNewConversation: boolean
    question: string
}

export const useSubmitCeramicDetails = ({ setCeramic, textChat, setTextChat, setImageSrc, reset, setImagesMain, mutateCreateChat, mutateUpdateChat }: UseCeramicDetailsProps)
    : UseMutationResult<CeramicDetails, Error, SubmitVars, unknown> => {
    return useMutation<CeramicDetails, Error, SubmitVars, unknown>({
        mutationFn: ({ formData }) => submitCeramicDetails({ formData }),
        onSuccess: (data, { isNewConversation, question }) => {
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


            if (isNewConversation) {
                const chatData: ChatForm = {
                    threadId: data.thread_id,
                    question: question,
                    answer: data.respuesta
                }
                mutateCreateChat({ chatData });
            } else {
                const thread_id = data.thread_id
                const updateChatFormData: UpdateChatForm = {
                    questions: [question],
                    answers: [data.respuesta]
                }

                mutateUpdateChat({ thread_id, updateChatFormData });
            }
            reset();
        },
        onError: () => {
            toast.dismiss();
            toast.error("Error al enviar la descripcion");
        }
    })
}