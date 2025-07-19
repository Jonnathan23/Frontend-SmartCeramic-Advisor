import { useState } from "react";
import { ToastContainer } from "react-toastify";
import SignUp from "../Components/auth/SignUp";
import Login from "../Components/auth/Login";

export default function AuthLayout() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className="cont--auth">
                <div className={`panels-container ${isLogin ? "" : "reversed"}`}>
                    <div className={`panel panel--left ${isLogin ? "" : ""}`}>
                        {isLogin ? (
                            <Login />
                        ) : (
                            <SignUp />
                        )}
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
