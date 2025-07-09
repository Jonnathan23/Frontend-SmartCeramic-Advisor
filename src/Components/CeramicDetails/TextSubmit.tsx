import { useForm } from "react-hook-form";
import type { CeramicDescriptionForm, CeramicDetails } from "../../types";
import ErrorMessage from "../ErrorMessage";
import type { Dispatch } from "react";
import { submitCeramicDescription } from "../../services/CeramicDetails.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

type TextSubmitProps = {
    setCeramic: Dispatch<React.SetStateAction<CeramicDetails | null>>
}

export default function TextSubmit({ setCeramic }: TextSubmitProps) {
    const defaultValues = {} as CeramicDescriptionForm;
    const { register, reset, handleSubmit, formState: { errors } } = useForm<CeramicDescriptionForm>({ defaultValues });


    const { mutate: submitMutation, isPending } = useMutation({
        mutationFn: submitCeramicDescription,
        onSuccess: (data) => {
            setCeramic(data as CeramicDetails);
            toast.success("Descripcion enviada correctamente");
            reset();
        },
        onError: () => {
            toast.error("Error al enviar la descripcion");
            setCeramic(null);
        }
    })

    const handleSubmitDescription = (data: CeramicDescriptionForm) => {
        console.log("Descripcion enviada:", data.description);
        submitMutation({ description: data.description });        
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitDescription)}>
            <div>
                <label htmlFor="description">Descripcion</label>
                <input type="text" {...register("description", {
                    required: "La descripcion es requerida",
                    minLength: {
                        value: 5,
                        message: "La descripcion debe tener al menos 5 caracteres"
                    },
                    maxLength: {
                        value: 500,
                        message: "La descripcion no puede exceder los 500 caracteres"
                    }
                })} />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>
            <button type="submit" disabled={isPending}>{isPending ? "Enviando..." : "Enviar"}</button>
        </form>
    );
}
