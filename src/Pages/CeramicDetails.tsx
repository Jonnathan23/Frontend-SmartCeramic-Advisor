import { useState } from "react";
import ImageSubmit from "../Components/CeramicDetails/ImageSubmit";
import type { CeramicDetails } from "../types";
import ProductsDetails from "../Components/CeramicDetails/ProductsDetails";
import TextSubmit from "../Components/CeramicDetails/TextSubmit";
import MarkdownRenderer from "../Components/CeramicDetails/MarkdownRenderer";

export default function CeramicDetails() {
    const [ceramic, setCeramic] = useState<CeramicDetails | null>(null);
    const [textChat, setTextChat] = useState<string[]>([]);

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

            <section>
                <h3>Chat</h3>
                <TextSubmit setTextChat={setTextChat} />
                {textChat.map((message, index) =>
                    <MarkdownRenderer key={index} content={message} />
                )}
            </section>

            {ceramic ? (
                <section>
                    <h3>Detalles de la Cerámica</h3>
                    <p>Resument: {ceramic.resumen}</p>
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
