import { array, object, string } from 'zod';

export const productsSchema = object({
    COD_PRODUCTO_NK2: string(),
    LINEA_NEGOCIO: string(),
    ESTADO_INVENTARIO: string(),
    CALIDAD: string(),
    MARCA: string(),
    FORMATO: string(),
    APLICACION: string(),
    COLOR: string(),
    COLECCION: string(),
    SUBMARCA: string()
});

export const ceramicDetailsSchema = object({
    resumen: string(),
    productos: array(productsSchema)
});