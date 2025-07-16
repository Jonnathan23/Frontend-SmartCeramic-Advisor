
type OtherCeramicProps = {
    ceramic: string
};
export default function OtherCeramic({ ceramic }: OtherCeramicProps) {
    const defaultImage = 'selectImage.jpg';
    return (
        <section className="ceramic-container-other">
            <h3 className="ceramic-container-other__title">{ceramic}</h3>
            <div className="ceramic-container-other__image">
                <img className="ceramic-other__image" width={200} src={defaultImage} alt="imagen" />
            </div>
        </section>
    );
}
