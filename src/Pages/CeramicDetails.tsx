import { useEffect, useState } from "react";
import type { CeramicDetails } from "../types";
import { isThereOthersCeramics } from "../utils/policies";
import OtherCeramic from "../Components/CeramicDetails/OtherCeramic";
import AsideMenu from "../Components/CeramicDetails/AsideMenu";
import CeramicChat from "../Components/CeramicDetails/CeramicChat";

export default function CeramicDetails() {
    const [ceramic, setCeramic] = useState<CeramicDetails | null>(null);
    const [textChat, setTextChat] = useState<string[]>([]);
    const [imageSrc, setImageSrc] = useState<string>('');

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
            <div className="container-main">
                <AsideMenu setImageSrc={setImageSrc} setTextChat={setTextChat} setCeramic={setCeramic} />
                <main>
                    <CeramicChat ceramic={ceramic} setCeramic={setCeramic} textChat={textChat} setTextChat={setTextChat} imageSrc={imageSrc} setImageSrc={setImageSrc} />
                </main>
            </div>
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
