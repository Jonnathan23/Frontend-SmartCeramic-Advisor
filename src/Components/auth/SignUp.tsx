import { useForm } from "react-hook-form";
import type { SignUpForm } from "../../types";
import { useSignUp } from "../../hooks/useAuth.use";
import { submitSignUpFirebase } from "../../services/UserService.api";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";

export default function SignUp() {

    const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<SignUpForm>();

    const [isLoading, setIsLoading] = useState(false);

    const { mutate, isPending } = useSignUp(reset);

    const handleSubmitLogin = (formData: SignUpForm) => submitSignUpFirebase({ formData, mutate, setIsLoading })

    return (
        <>
            <div className="cont--form">
                <h1 className="auth--title">Registrarse</h1>
                <form className="form--sign-up" onSubmit={handleSubmit(handleSubmitLogin)}>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="email">Email</label>
                        <input className="field" type="email" id="email" placeholder="Ej. ejemplo@gmail.com"
                            {...register("email", {
                                required: "El email es requerido",
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El email no es válido" }
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="username">Nombre de usuario</label>
                        <input className="field" type="text" id="username" placeholder="Ej. Daniel Harman"
                            {...register("username", {
                                required: "El nombre de usuario es requerido",
                                minLength: { value: 3, message: "El nombre de usuario debe tener al menos 3 caracteres" }
                            })}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="password">Contraseña</label>
                        <input className="field" type="password" id="password" placeholder="Contraseña"
                            {...register("password", {
                                required: "La contraseña es requerida",
                                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="confirm-password">Confirmar contraseña</label>
                        <input className="field" type="password" id="confirm-password" placeholder="Confirmar Contraseña"
                            {...register("confirmPassword", {
                                required: "La confirmacion de contraseña es requerida",
                                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                                validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                    </div>
                    <div className="cont--button">
                        <button className="button" disabled={isPending || isLoading}>Registrarse</button>
                    </div>
                </form>
            </div>
        </>
    );
}
