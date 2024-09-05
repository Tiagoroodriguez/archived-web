import { useState } from 'react';
import { formatPrice } from '../../utils/formatePrice';
import { formateText } from '../../utils/formateText';
import './ComponentesAdmin.css';
import { useProduct } from '../../context/ProductContext';
import { toast } from 'sonner';
import EditProduct from './EditProduct';
import AddProductoStock from './AddStockProducto';
import { Badge } from '@tremor/react';
import Descuentos from './Descuentos';
import { AnimatePresence, motion } from 'framer-motion';

export default function TablaProductos({ productos }) {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [aviso, setAviso] = useState(false);
  const [productId, setProductId] = useState('');
  const [editProduct, setEditProduct] = useState(false);
  const [addStock, setAddStock] = useState(false);
  const [descuentos, setDescuentos] = useState(false);
  const [categoria, setCategoria] = useState('all');
  const [buscador, setBuscador] = useState('');
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

  const handleCategoriaChange = (newCategoria) => {
    setCategoria(newCategoria);
  };

  const handleBuscadorChange = (e) => {
    setBuscador(e.target.value);
  };

  const eliminar = async () => {
    handleAvisoChange();
    await deleteProduct(productId);
    toast.success('Producto eliminado con exito');
  };

  const filtro = () => {
    if (categoria === 'all' || !categoria) {
      return productos;
    } else {
      return productos.filter((producto) => producto.categoria === categoria);
    }
  };

  const productosFiltradosNombre = () => {
    if (buscador === '') {
      return filtro();
    } else {
      return filtro().filter((producto) =>
        producto.nombre.toLowerCase().includes(buscador.toLowerCase())
      );
    }
  };

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {aviso && (
          <div className='product-aviso'>
            <motion.div
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={variants}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          </div>
        )}
        {editProduct && (
          <EditProduct
            onClick={() => {
              setEditProduct(false);
            }}
            id={productId}
          />
        )}
        {addStock && (
          <AddProductoStock
            onClick={() => setAddStock(false)}
            id={productId}
          />
        )}
        {descuentos && (
          <Descuentos
            onClick={() => setDescuentos(false)}
            id={productId}
          />
        )}
      </AnimatePresence>
      <table className='tabla-productos-container'>
        <header className='tabla-header'>
          <div className='tabla-header-title'>
            <h2>Productos</h2>
            <Badge size='xs'>{productos.length} productos</Badge>
          </div>
          <div className='tabla-header-actions'>
            <div className='tabla-header-search'>
              <input
                type='text'
                placeholder='Buscar producto'
                onChange={handleBuscadorChange}
              />
              <i className='bi bi-search' />
            </div>
            <select
              value={categoria}
              onChange={(e) => handleCategoriaChange(e.target.value)}
            >
              <option value='all'>Filtrar por</option>
              <option value='remera'>Remera Overzise</option>
              <option value='remera'>Remera Boxi</option>
              <option value='buzo'>Buzo</option>
              <option value='pantalon'>Pantalon</option>
            </select>
          </div>
        </header>
        <thead className='tabla-productos-header'>
          <tr>
            <th className='tabla-productos-item flex justify-start'>Nombre</th>
            <th className='tabla-productos-item center flex justify-center'>
              Precio
            </th>
            <th className='tabla-productos-item center flex justify-center'>
              Stock
            </th>
            <th className='tabla-productos-item flex justify-end'>Acciones</th>
          </tr>
        </thead>
        <tbody className='tabla-productos-body'>
          {productosFiltradosNombre().map((producto) => (
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
              <td className='tabla-productos-item flex justify-center'>
                {producto.discount > 0 ? (
                  <p>
                    <span className='opacity-60 line-through'>
                      {formatPrice(producto.precio)}
                    </span>{' '}
                    {formatPrice(producto.precio_con_descuento)}
                  </p>
                ) : (
                  <p>{formatPrice(producto.precio)}</p>
                )}
              </td>
              <td
                className='tabla-productos-item tabla-productos-stock flex justify-center'
                onMouseEnter={() => handleMouseEnter(producto._id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setProductId(producto._id);
                  setAddStock(true);
                }}
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
                <button
                  className='tabla-producto-add'
                  onClick={() => {
                    setProductId(producto._id);
                    setDescuentos(true);
                  }}
                >
                  <i className='bi bi-tag' />
                </button>
                <button
                  className='tabla-producto-edit'
                  onClick={() => {
                    setProductId(producto._id);
                    setEditProduct(true);
                  }}
                >
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
