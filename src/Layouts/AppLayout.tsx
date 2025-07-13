import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
    return (
        <>
            <div className="app-layout">
                <header className="app-header">
                    <div className="app__header__container-logo">
                        <Link to="/" >
                            <img className="app__header__logo" src="logoSmart_v3.png" alt="" />
                        </Link>
                    </div>
                    <nav className="app-nav">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "header__nav-element")}> Recomendaciones </NavLink>
                        <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "header__nav-element")}> Historial </NavLink>
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
