import { useForm } from "react-hook-form";
import type { LoginForm } from "../../types";
import { loginFirebase } from "../../services/UserService.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, reset, handleSubmit, formState: { errors } } = useForm<LoginForm>();

    const handleSubmitLogin = async (formData: LoginForm) => {
        const response = await loginFirebase({ loginData: formData, setIsLoading })
        if (response) {
            reset()
            navigate('/')
        }
    }

    return (
        <div className="cont--form">
            <h1 className="auth--title">Iniciar sesión</h1>
            <form
                className="form--login"
                onSubmit={handleSubmit(handleSubmitLogin)}
            >
                <div className="cont--field">
                    <label className="label--field" htmlFor="email">Email</label>
                    <input
                        className="field"
                        type="email"
                        id="email"
                        placeholder="Ej. ejemplo@gmail.com"
                        disabled={isLoading}
                        {...register('email', {
                            required: 'El email es requerido',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Formato de email inválido'
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="cont--field">
                    <label className="label--field" htmlFor="password">Contraseña</label>
                    <input
                        className="field"
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        disabled={isLoading}
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="cont--button">
                    <button className="button" disabled={isLoading}>
                        {isLoading ? 'Ingresando…' : 'Ingresar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
