import type { CeramicDetails } from "../types";

export const updateCeramicDetailsStorage = (data: CeramicDetails, newMessage: string[]) => {
    cleanCeramicDetailsStorage();
    localStorage.setItem('ceramic', JSON.stringify(data));
    localStorage.setItem('textChat', JSON.stringify(newMessage));
}

export const cleanCeramicDetailsStorage = () => {
    localStorage.removeItem('ceramic');
    localStorage.removeItem('textChat');
}

export const getImageSource = (rawImage: string | null) => {
    const defaultImage = 'selectImage.jpg';
    if (!rawImage) return defaultImage;
    if (/^(http|https):\/\//.test(rawImage)) return rawImage;
    if (/\.(jpg|jpeg|png|webp)$/i.test(rawImage)) return rawImage;
    if (rawImage.startsWith('data:')) return rawImage;
    const detectedMimeType = rawImage.startsWith('/9j/') ? 'image/jpeg'
        : rawImage.startsWith('iVBOR') ? 'image/png'
            : 'image/jpeg';
    return `data:${detectedMimeType};base64,${rawImage}`;
};