import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import CeramicDetails from "./pages/CeramicDetails";
import NotFoundLayout from "./Layouts/NotFoundLayout";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={< CeramicDetails />} index />
                </Route>

                <Route path="*" element={<NotFoundLayout />} />
            </Routes>
        </BrowserRouter>
    );
}
