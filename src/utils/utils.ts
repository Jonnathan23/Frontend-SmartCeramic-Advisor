import type { CeramicDetails } from "../types";

export const updateCeramicDetailsStorage = (data: CeramicDetails, newMessage: string[]) => {
    localStorage.removeItem('ceramic');
    localStorage.removeItem('textChat');
    
    localStorage.setItem('ceramic', JSON.stringify(data));
    localStorage.setItem('textChat', JSON.stringify(newMessage));
}