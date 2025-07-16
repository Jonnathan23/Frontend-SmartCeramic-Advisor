
type OtherCeramicProps = {
    ceramic: string
};
export default function OtherCeramic({ ceramic }: OtherCeramicProps) {
    const defaultImage = 'selectImage.jpg';
    return (
        <section>
            <h3>{ceramic}</h3>
            <img width={200} src={defaultImage} alt="imagen" />
        </section>
    );
}
