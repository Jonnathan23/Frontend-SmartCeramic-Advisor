import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
    return (
        <>
            <div className="app-layout">
                <header className="app-header">
                    <h1>SmartCeramic Advisor</h1>
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
