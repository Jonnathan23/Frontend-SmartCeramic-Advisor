import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className="cont--auth">
                <div className={`panels-container ${isLogin ? "" : "reversed"}`}>
                    <div className={`panel panel--left ${isLogin ? "":""}`}>
                        {isLogin ? (
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
                        ) : (
                            <div className="cont--form">
                                <h1 className="auth--title">Registrarse</h1>
                                <form className="form--sign-up">
                                    <div className="cont--field">
                                        <label className="label--field" htmlFor="usr_email">Email</label>
                                        <input className="field" type="email" name="usr_email" id="usr_email" placeholder="Ej. ejemplo@gmail.com" />
                                    </div>
                                    <div className="cont--field">
                                        <label className="label--field" htmlFor="usr_email">Nombre de usuario</label>
                                        <input className="field" type="email" name="usr_email" id="usr_email" placeholder="Ej. ejemplo@gmail.com" />
                                    </div>
                                    <div className="cont--field">
                                        <label className="label--field" htmlFor="usr_password">Contraseña</label>
                                        <input className="field" type="password" name="usr_password" id="usr_password" placeholder="Contraseña" />
                                    </div>
                                    <div className="cont--field">
                                        <label className="label--field" htmlFor="usr_password">Confirmar contraseña</label>
                                        <input className="field" type="password" name="usr_password" id="usr_password" placeholder="Contraseña" />
                                    </div>
                                    <div className="cont--button">
                                        <button className="button">Registrarse</button>
                                    </div>
                                </form>
                            </div>)}
                    </div>

                    <div className="panel panel--right">
                        {isLogin ?
                            (
                                <div className="cont--button--no-account">
                                    <button className="button--no-account" onClick={() => setIsLogin(false)}>Registrarse</button>
                                </div>
                            ) : (
                                <div className="cont--button--no-account">
                                    <button className="button--no-account" onClick={() => setIsLogin(true)}>Iniciar Sesion</button>
                                </div>
                            )}
                    </div>
                </div>
            </div>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    );
}
