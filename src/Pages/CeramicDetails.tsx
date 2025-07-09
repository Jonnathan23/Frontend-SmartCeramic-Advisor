import { useEffect, useState } from "react";
import ImageSubmit from "../Components/CeramicDetails/ImageSubmit";
import type { CeramicDetails } from "../types";
import ProductsDetails from "../Components/CeramicDetails/ProductsDetails";
import TextSubmit from "../Components/CeramicDetails/TextSubmit";
import MarkdownRenderer from "../Components/CeramicDetails/MarkdownRenderer";

export default function CeramicDetails() {
    const [ceramic, setCeramic] = useState<CeramicDetails | null>(null);
    const [textChat, setTextChat] = useState<string[]>([]);
    const [threadId, setThreadId] = useState<string>('');

    useEffect(() => {
        const storedThreadId = localStorage.getItem('ceramicThreadId');
        if (storedThreadId) {
            setThreadId(storedThreadId);
        } else {
            // Si no hay threadId guardado, inicializarlo
            setThreadId('');
        }
    }, [])

    return (
        <>
            <section className="ceramic-assistant">
                <h2>Asistente de Ceramicas</h2>
                <p>Encontrar la ceramica perfecta</p>
                <p>
                    Este asistente te ayudara a encontrar la ceramica perfecta para tu hogar.
                    Puedes subir una imagen de la ceramica que te gusta y nosotros te ayudaremos a encontrarla.
                </p>
                <ImageSubmit setCeramic={setCeramic} />
            </section>

            <section className="ceramic-chat">
                <h3>Chat</h3>
                <TextSubmit setTextChat={setTextChat} setThreadId={setThreadId} threadId={threadId} />
                {textChat.map((message, index) =>
                    <MarkdownRenderer key={index} content={message} />
                )}
            </section>

            {ceramic ? (
                <section>
                    <h3>Detalles de la Cerámica</h3>
                    <div>
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
                <p>Sube una imagen de la ceramica que te gusta, o escribe los detalles para una recomendacion</p>
            </>)}
        </>
    );
}
