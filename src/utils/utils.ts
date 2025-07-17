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