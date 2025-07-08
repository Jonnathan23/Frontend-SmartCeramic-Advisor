import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
    return (
        <>
            <header>
                <h1>SmartCeramic Advisor</h1>
            </header>
            <div>
                <Outlet />
            </div>
            <footer>
                <p>Copyright &copy; 2025</p>
            </footer>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    );
}
