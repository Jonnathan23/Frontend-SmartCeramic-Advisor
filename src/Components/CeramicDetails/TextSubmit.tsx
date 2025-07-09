import { useForm } from "react-hook-form";
import type { CeramicChatForm } from "../../types";
import ErrorMessage from "../ErrorMessage";
import type { Dispatch } from "react";
import { submitCeramicDescription } from "../../services/CeramicDetails.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

type TextSubmitProps = {
    setTextChat: Dispatch<React.SetStateAction<string[]>>
}

export default function TextSubmit({ setTextChat }: TextSubmitProps) {
    const defaultValues = {} as CeramicChatForm;
    const { register, reset, handleSubmit, formState: { errors } } = useForm<CeramicChatForm>({ defaultValues });


    const { mutate: submitMutation, isPending } = useMutation({
        mutationFn: submitCeramicDescription,
        onSuccess: (data) => {
            console.log("Descripcion enviada:", data);
            if (!data) {
                toast.error("No se ha recibido respuesta del servidor");
                return;
            }

            const newMessage = data.respuesta;
            setTextChat((prev) => [...prev, newMessage]);

            toast.success("Descripcion enviada correctamente");
            reset();
        },
        onError: () => {
            toast.error("Error al enviar la descripcion");
        }
    })

    const handleSubmitDescription = (data: CeramicChatForm) => {
        console.log("Descripcion enviada:", data);
        submitMutation({ formData: data });
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitDescription)} className="ceramic-chat-form">
            <div className="ceramic-chat-form__group">
                <label className="ceramic-chat-form__label" htmlFor="mensaje">Descripcion</label>
                <input className="ceramic-chat-form__input" type="text" {...register("mensaje", {
                    required: "El mensaje es obligatorio",
                    minLength: {
                        value: 5,
                        message: "La descripcion debe tener al menos 5 caracteres"
                    },
                    maxLength: {
                        value: 500,
                        message: "La descripcion no puede exceder los 500 caracteres"
                    }
                })} />
                {errors.mensaje && <ErrorMessage>{errors.mensaje.message}</ErrorMessage>}
            </div>
            <button className={`ceramic-chat-form__button ${isPending ? "ceramic-chat-form__button--disabled" : ""
                }`} type="submit" disabled={isPending}>{isPending ? "Enviando..." : "Enviar"}</button>

        </form>
    );
}
