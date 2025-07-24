import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
// import CeramicDetails from "./pages/CeramicDetails";
import NotFoundLayout from "./Layouts/NotFoundLayout";
import AuthLayout from "./Layouts/AuthLayout";
import VoiceTest from "./Pages/Voice";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    {/* <Route path="/" element={< CeramicDetails />} index /> */}
                    <Route path="/voice-test" element={<VoiceTest />} />
                </Route>

                <Route path="*" element={<NotFoundLayout />} />
                <Route path="/auth" element={<AuthLayout />} />
            </Routes>
        </BrowserRouter>
    );
}
