import type { CeramicDetails } from "../types";

export const isThereOthersCeramics = (ceramic: CeramicDetails | null) => ceramic && ceramic.Principal && (ceramic.Otras.length > 0)