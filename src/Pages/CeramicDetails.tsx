import { useEffect, useState } from "react";
import ImageSubmit from "../Components/CeramicDetails/ImageSubmit";
import type { CeramicDetails } from "../types";
import ProductsDetails from "../Components/CeramicDetails/ProductsDetails";
import TextSubmit from "../Components/CeramicDetails/TextSubmit";
import MarkdownRenderer from "../Components/MarkdownRenderer";

export default function CeramicDetails() {
    const [ceramic, setCeramic] = useState<CeramicDetails | null>(null);
    const [textChat, setTextChat] = useState<string[]>([]);
    const [threadId, setThreadId] = useState<string>('');

    useEffect(() => {
        const storedThreadId = localStorage.getItem('ceramicThreadId');
        const storedCeramic = localStorage.getItem('ceramicDetails');
        const ceramicData = storedCeramic ? JSON.parse(storedCeramic) : null;
        const isThereTextChat = localStorage.getItem('ceramicTextChat');
        const storedTextChat = isThereTextChat ? JSON.parse(isThereTextChat) : [] as string[];

        if (ceramicData) {
            setCeramic(ceramicData);
        }

        if (storedTextChat.length) {
            setTextChat(storedTextChat);
        }

        if (storedThreadId) {
            setThreadId(storedThreadId);
        }
    }, [])

    return (
        <>
            <div className="ceramic-container">
                <article className="ceramic-assistant">
                    <h2 className="ceramic-assistant__title">Asistente de Ceramicas</h2>
                    <p>Encontrar la ceramica perfecta</p>
                    <p>
                        Este asistente te ayudara a encontrar la ceramica perfecta para tu hogar.
                        Puedes subir una imagen de la ceramica que te gusta y nosotros te ayudaremos a encontrarla.
                    </p>
                    <ImageSubmit setCeramic={setCeramic} />
                </article>

                <section className="ceramic-chat">
                    <h3>Chat</h3>
                    <TextSubmit setTextChat={setTextChat} setThreadId={setThreadId} threadId={threadId} />
                    {textChat.map((message, index) =>
                        <MarkdownRenderer key={index} content={message} />
                    )}
                </section>
            </div>

            <main>
                {ceramic ? (
                    <section className="ceramic-details">
                        <h3 className="ceramic-details__title">Detalles de la Cerámica</h3>
                        <div >
                            <p>Resumen: </p>
                            <MarkdownRenderer content={ceramic.resumen} />

                        </div>
                        <p>Productos:</p>
                        <ul>
                            {
                                ceramic.productos.map((product, index) => (
                                    <li key={index}>
                                        <ProductsDetails product={product} />
                                    </li>
                                ))

                            }
                        </ul>
                    </section>
                ) : (<>
                    <p className="default-text">Sube una imagen de la ceramica que te gusta, o escribe los detalles para una recomendacion</p>
                </>)}
            </main>
        </>
    );
}
