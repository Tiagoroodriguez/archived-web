import { useState } from 'react';
import { formatPrice } from '../../utils/formatePrice';
import { formateText } from '../../utils/formateText';
import './ComponentesAdmin.css';
import { useProduct } from '../../context/ProductContext';
import { toast } from 'sonner';

export default function TablaProductos({ productos }) {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [aviso, setAviso] = useState(false);
  const [productId, setProductId] = useState('');
  const { deleteProduct } = useProduct();

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAvisoChange = () => {
    setAviso(!aviso);
  };

  const eliminar = async () => {
    handleAvisoChange();
    await deleteProduct(productId);
    toast.success('Producto eliminado con exito');
  };

  return (
    <>
      {aviso && (
        <div className='product-aviso'>
          <div>
            <p>¿Estás seguro que deseas eliminar este producto?</p>
            <div>
              <button
                onClick={handleAvisoChange}
                className='cancelar'
              >
                Cancelar
              </button>
              <button
                className='eliminar'
                onClick={eliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
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
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td className='tabla-productos-item tabla-productos-item-detalle'>
                <picture>
                  <img
                    src={`/images/productos/small/${producto.nombre}.webp`}
                    alt={`imagen del producto ${producto.nombre}`}
                  />
                </picture>
                <p>
                  {formateText(producto.categoria)}{' '}
                  {formateText(producto.nombre)}
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
                <button
                  className='tabla-producto-delete'
                  onClick={() => {
                    setProductId(producto._id);
                    handleAvisoChange();
                  }}
                >
                  <i className='bi bi-trash' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
