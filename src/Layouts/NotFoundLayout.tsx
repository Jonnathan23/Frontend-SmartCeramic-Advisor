import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function NotFoundLayout() {
    useEffect(() => { toast.info("Proximamente...") }, [])
    return (
        <>
            <h1>404</h1>
            <p>Página no encontrada</p>
            <img src="logo.png" alt="" />
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    );
}