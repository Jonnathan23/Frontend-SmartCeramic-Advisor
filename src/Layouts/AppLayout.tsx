import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLogin } from "../hooks/useAuth.use";
import type { UserFirebase } from "../types";
import { useEffect } from "react";

export default function AppLayout() {
    // 1) Leer crudo y parsear sólo si no es null/empty
    const storedUser = localStorage.getItem('user')
    const user: UserFirebase | null = storedUser
        ? JSON.parse(storedUser)
        : null

    // 2) Extraes el idFirebase (o cadena vacía si no hay user)
    const firebaseId = user?.idFirebase ?? ''

    // 3) LLamas a useLogin SIEMPRE, con firebaseId (aunque sea vacío)
    const { data, isError, isLoading } = useLogin(firebaseId)

    // 4) El useEffect también SIEMPRE
    useEffect(() => {
        if (!data) return
        localStorage.setItem('threads', JSON.stringify(data.threads))
        localStorage.setItem('userId', JSON.stringify(data.id))
    }, [data])

    // 5) Ahora sí puedes condicionar renders y redirecciones
    if (!user || isError) return <Navigate to="/auth" />
    if (isLoading) return <div>Loading...</div>
    
    return (<>
        <div className="app-layout">
            <header className="app-header">
                <div className="app__header__container-logo">
                    <Link to="/" className="app__header__logo-link" >
                        <div className="app__header__logo-half-diamond"></div>
                        <img className="app__header__logo" src="logo_v5.png" alt="" />
                    </Link>
                </div>
                <nav className="app-nav">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "header__nav-element")}> Buscador de Ceramicas </NavLink>
                    <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "header__nav-element")}> Cuenta </NavLink>
                    <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "header__nav-element header__nav-element--logout")}> Cerrar Sesión </NavLink>
                </nav>
            </header>
            <div className="app-content">
                <Outlet />
            </div>
            <footer className="app-footer">
                <p>Copyright &copy; 2025</p>
            </footer>
        </div>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
    );
}
