import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
    return (
        <>
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
