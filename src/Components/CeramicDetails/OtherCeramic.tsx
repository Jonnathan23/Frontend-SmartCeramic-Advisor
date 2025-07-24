import type { OtherCheramic } from "../../types";
import { getImageSource } from "../../utils/utils";

type OtherCeramicProps = {
    ceramic: OtherCheramic
};
export default function OtherCeramic({ ceramic }: OtherCeramicProps) {

    return (
        <section className="ceramic-container-other">
            <h3 className="ceramic-container-other__title">{ceramic.nombre}</h3>
            <p className="">Probabilidad: {ceramic.probabilidad}%</p>
            <div className="ceramic-container-other__images">
                {ceramic.imagenes.map((imagen, index) => (
                    <div key={index} className="ceramic-container-other__image">
                        <img
                            className="ceramic-other__image"
                            width={200}
                            src={getImageSource(imagen)}
                            alt={`Cerámica ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
