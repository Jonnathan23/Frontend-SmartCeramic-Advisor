import type { Products } from "../types";

type ProductsDetailsProps = {
    product: Products
}

export default function ProductsDetails({ product }: ProductsDetailsProps) {
    const { COD_PRODUCTO_NK2, LINEA_NEGOCIO, ESTADO_INVENTARIO, CALIDAD, MARCA, FORMATO, APLICACION, COLOR, COLECCION, SUBMARCA } = product

    return (
        <section>
            <h2>Detalles del Producto</h2>
            <p>Aquí se mostrarán los detalles del producto seleccionado.</p>
            <ul>
                <li><strong>Código Producto:</strong> {COD_PRODUCTO_NK2}</li>
                <li><strong>Línea de Negocio:</strong> {LINEA_NEGOCIO}</li>
                <li><strong>Estado de Inventario:</strong> {ESTADO_INVENTARIO}</li>
                <li><strong>Calidad:</strong> {CALIDAD}</li>
                <li><strong>Marca:</strong> {MARCA}</li>
                <li><strong>Formato:</strong> {FORMATO}</li>
                <li><strong>Aplicación:</strong> {APLICACION}</li>
                <li><strong>Color:</strong> {COLOR}</li>
                <li><strong>Colección:</strong> {COLECCION}</li>
                <li><strong>Submarca:</strong> {SUBMARCA}</li>
            </ul>
        </section>
    );
}
