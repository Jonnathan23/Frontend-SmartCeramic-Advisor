import { useForm } from "react-hook-form";
import type { LoginForm } from "../../types";

export default function Login() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<LoginForm>();

    const handleSubmitLogin = (formData: LoginForm) => {

    }

    return (
        <>
            <div className="cont--form">
                <h1 className="auth--title">Iniciar sesion</h1>
                <form className="form--login">
                    <div className="cont--field">
                        <label className="label--field" htmlFor="usr_email">Email</label>
                        <input className="field" type="email" name="usr_email" id="usr_email" placeholder="Ej. ejemplo@gmail.com" />
                    </div>
                    <div className="cont--field">
                        <label className="label--field" htmlFor="usr_password">Contraseña</label>
                        <input className="field" type="password" name="usr_password" id="usr_password" placeholder="Contraseña" />
                    </div>
                    <div className="cont--button">
                        <button className="button">Ingresar</button>
                    </div>
                </form>
            </div>
        </>
    );
}
