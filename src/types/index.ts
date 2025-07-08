import { z } from 'zod';
import type { ceramicDetailsSchema, productsSchema } from '../utils/ceramicDetails.schema';


//* |-----------------| | CeramicDetails | |-----------------|

export type CeramicDetails = z.infer<typeof ceramicDetailsSchema>;
export type Products = z.infer<typeof productsSchema>;