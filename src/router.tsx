import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import CeramicDetails from "./pagesss_temp/CeramicDetails";
import NotFoundLayout from "./Layouts/NotFoundLayout";
import AuthLayout from "./Layouts/AuthLayout";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<CeramicDetails />} index />
                </Route>

                <Route path="*" element={<NotFoundLayout />} />
                <Route path="/auth" element={<AuthLayout />} />
            </Routes>
        </BrowserRouter>
    );
}
