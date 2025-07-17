import { useEffect, useState } from "react";
import ImageSubmit from "../Components/CeramicDetails/ImageSubmit";
import type { CeramicDetails, CeramicForm } from "../types";
import MarkdownRenderer from "../Components/MarkdownRenderer";
import { useMutation } from "@tanstack/react-query";
import { submitCeramicDetails } from "../services/CeramicDetails.api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { isThereOthersCeramics } from "../utils/policies";
import OtherCeramic from "../Components/CeramicDetails/OtherCeramic";
import AsideMenu from "../Components/CeramicDetails/AsideMenu";

export default function CeramicDetails() {
    const [ceramic, setCeramic] = useState<CeramicDetails | null>(null);
    const [textChat, setTextChat] = useState<string[]>([]);

    useEffect(() => {
        const ceramicStorage = localStorage.getItem('ceramic');
        const textChatStorage = localStorage.getItem('textChat');
        if (ceramicStorage) {
            setCeramic(JSON.parse(ceramicStorage));
        }

        if (textChatStorage) {
            setTextChat(JSON.parse(textChatStorage));
        }

    }, [])

  


    return (
        <>
            <main>                
            </main>
            <AsideMenu />
            {isThereOthersCeramics(ceramic) && (<>
                <h3 className="ceramic-assistant__title--others">Otras Ceramicas</h3>
                <div className="container-others">
                    {ceramic?.Otras && ceramic.Otras.map((ceramic, index) => (
                        <OtherCeramic key={index} ceramic={ceramic} />
                    ))}
                </div>
            </>)
            }
        </>
    );
}
