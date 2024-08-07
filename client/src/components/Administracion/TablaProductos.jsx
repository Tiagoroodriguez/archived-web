import { useState } from 'react';
import { formatPrice } from '../../utils/formatePrice';
import { formateText } from '../../utils/formateText';
import './ComponentesAdmin.css';

export default function TablaProductos({ remeras, buzos }) {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  return (
    <table className='tabla-productos-container'>
      <thead className='tabla-productos-header'>
        <tr className='tabla-productos-item'>Producto</tr>
        {/*<tr className='tabla-productos-item'>Descripcion</tr>*/}
        <tr className='tabla-productos-item center flex justify-center'>
          Precio
        </tr>
        <tr className='tabla-productos-item center flex justify-center'>
          Stock
        </tr>
        <tr className='tabla-productos-item flex justify-end'>Acciones</tr>
      </thead>
      <tbody className='tabla-productos-body'>
        {remeras.map((producto) => (
          <tr key={producto._id}>
            <td className='tabla-productos-item tabla-productos-item-detalle'>
              <picture>
                <img
                  src={`/images/productos/small/${producto.nombre}.webp`}
                  alt={`imagen del producto ${producto.nombre}`}
                />
              </picture>
              <p>
                {formateText(producto.categoria)} {formateText(producto.nombre)}
              </p>
            </td>
            {/*<td className='tabla-productos-item'>{producto.descripcion}</td>*/}
            <td className='tabla-productos-item flex justify-center'>
              {formatPrice(producto.precio)}
            </td>
            <td
              className='tabla-productos-item tabla-productos-stock flex justify-center'
              onMouseEnter={() => handleMouseEnter(producto._id)}
              onMouseLeave={handleMouseLeave}
            >
              {producto.cant_s +
                producto.cant_m +
                producto.cant_l +
                producto.cant_xl}
              {hoveredProductId === producto._id && (
                <div className='detalle-cantidad'>
                  <ul>
                    <li>S: {producto.cant_s}</li>
                    <li>M: {producto.cant_m}</li>
                    <li>L: {producto.cant_l}</li>
                    <li>XL: {producto.cant_xl}</li>
                  </ul>
                </div>
              )}
            </td>
            <td className='tabla-productos-item flex justify-end'>
              <button className='tabla-producto-add'>
                <i className='bi bi-plus-circle' />
              </button>
              <button className='tabla-producto-edit'>
                <i className='bi bi-pencil-square' />
              </button>
              <button className='tabla-producto-delete'>
                <i className='bi bi-trash' />
              </button>
            </td>
          </tr>
        ))}
        {buzos.map((producto) => (
          <tr key={producto._id}>
            <td className='tabla-productos-item tabla-productos-item-detalle'>
              <picture>
                <img
                  src={`/images/productos/small/${producto.nombre}.webp`}
                  alt={`imagen del producto ${producto.nombre}`}
                />
              </picture>
              <p>
                {formateText(producto.categoria)} {formateText(producto.nombre)}
              </p>
            </td>
            {/*<td className='tabla-productos-item'>{producto.descripcion}</td>*/}
            <td className='tabla-productos-item flex justify-center'>
              {formatPrice(producto.precio)}
            </td>
            <td
              className='tabla-productos-item tabla-productos-stock flex justify-center'
              onMouseEnter={() => handleMouseEnter(producto._id)}
              onMouseLeave={handleMouseLeave}
            >
              {producto.cant_s +
                producto.cant_m +
                producto.cant_l +
                producto.cant_xl}
              {hoveredProductId === producto._id && (
                <div className='detalle-cantidad'>
                  <ul>
                    <li>S: {producto.cant_s}</li>
                    <li>M: {producto.cant_m}</li>
                    <li>L: {producto.cant_l}</li>
                    <li>XL: {producto.cant_xl}</li>
                  </ul>
                </div>
              )}
            </td>

            <td className='tabla-productos-item flex justify-end'>
              <button className='tabla-producto-add'>
                <i className='bi bi-plus-circle' />
              </button>
              <button className='tabla-producto-edit'>
                <i className='bi bi-pencil-square' />
              </button>
              <button className='tabla-producto-delete'>
                <i className='bi bi-trash' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
