import { Producto } from '../Producto/Producto';
import { BotonColor } from '../BotonColor/BotonColor';
import './Novedades.css';

export function Novedades() {
    return (
        <section className='novedades-section'>
            <div className="mensaje-container">
                <p>"No somos una marca, somos un movimiento"</p>
            </div>

            <div className="novedades-container">
                <Producto 
                nombreProducto="Lacosting" 
                categoriaProducto="Remera oversize"
                precioProducto={"20.000"}
                imagenProducto="download.webp"
                />

                <Producto 
                nombreProducto="Destroy" 
                categoriaProducto="Remera oversize"
                precioProducto={"20.000"}
                imagenProducto="download.webp"
                />

                <Producto 
                nombreProducto="Archived" 
                categoriaProducto="Remera oversize"
                precioProducto={"40.000"}
                imagenProducto="download.webp"
                />

                <Producto 
                nombreProducto="Lover" 
                categoriaProducto="Remera oversize"
                precioProducto={"10.000"}
                imagenProducto="download.webp"
                />
                
            </div>

            <BotonColor
            textoBoton="Ver todos los productos"
            linkBoton="tienda"
            />

        </section>
    )
}