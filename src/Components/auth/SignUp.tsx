import { useForm } from "react-hook-form";
import type { SignUpForm } from "../../types";

export default function SignUp() {

    const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<SignUpForm>();

    const handleSubmitLogin = (formData: SignUpForm) => {

    }

    return (
        <>
            <div className="cont--form">
                <h1 className="auth--title">Registrarse</h1>
                <form className="form--sign-up" onSubmit={handleSubmit(handleSubmitLogin)}>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="email">Email</label>
                        <input className="field" type="email" id="email" placeholder="Ej. ejemplo@gmail.com"
                            {...register("email", { required: "El email es requerido" })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="username">Nombre de usuario</label>
                        <input className="field" type="text" id="username" placeholder="Ej. Daniel Harman"
                            {...register("username", {
                                required: "El nombre de usuario es requerido",
                                minLength: { value: 3, message: "El nombre de usuario debe tener al menos 3 caracteres" }
                            })}
                        />
                        {errors.username && <p className="error">{errors.username.message}</p>}
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="password">Contraseña</label>
                        <input className="field" type="password" id="password" placeholder="Contraseña"
                            {...register("password", {
                                required: "La contraseña es requerida",
                                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="password">Confirmar contraseña</label>
                        <input className="field" type="password" id="password" placeholder="Confirmar Contraseña"
                            {...register("confirmPassword", {
                                required: "La confirmacion de contraseña es requerida",
                                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                                validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="cont--button">
                        <button className="button">Registrarse</button>
                    </div>
                </form>
            </div>
        </>
    );
}
