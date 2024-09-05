import { useEffect, useState } from 'react';
import { Boton } from '../Boton/Boton';
import { useProduct } from '../../context/ProductContext';
import 'react-quill/dist/quill.snow.css'; // Estilos por defecto
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AddProductoStock({ onClick, id }) {
  const [initialLoad, setInitialLoad] = useState(true);
  const { getProduct, updateProduct } = useProduct();

  const [producto, setProducto] = useState({
    _id: id,
    cant_s: 0,
    cant_m: 0,
    cant_l: 0,
    cant_xl: 0,
    cant_xxl: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(producto);
      toast.success('Stock actualizado correctamente');
      onClick();
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el stock');
    }
  };

  useEffect(() => {
    if (initialLoad) {
      getProduct(id).then((res) => {
        setProducto({
          _id: res._id,
          cant_s: res.cant_s,
          cant_m: res.cant_m,
          cant_l: res.cant_l,
          cant_xl: res.cant_xl,
          cant_xxl: res.cant_xxl,
        });
        setInitialLoad(false);
      });
    }
  }, [initialLoad, getProduct, id]);

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <div className='add-producto-container'>
      <motion.section
        className='add-producto-form-container'
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        <header className='add-producto-form-header'>
          <h1>
            <i className='bi bi-archive-fill' />
            Añadir stock
          </h1>
          <p>Agrega stock de un producto a tu tienda.</p>
          <button
            className='boton-salir'
            onClick={onClick}
          >
            <i className='bi bi-x' />
          </button>
        </header>

        <form className='add-producto-form'>
          <div className='add-producto-info-container'>
            <label>Cantidad S:</label>
            <input
              type='number'
              placeholder='Cantidad de productos en talle S'
              name='cant_s'
              value={producto.cant_s}
              onChange={handleChange}
            />
          </div>
          <div className='add-producto-info-container'>
            <label>Cantidad M:</label>
            <input
              type='number'
              placeholder='Cantidad de productos en talle M'
              name='cant_m'
              value={producto.cant_m}
              onChange={handleChange}
            />
          </div>
          <div className='add-producto-info-container'>
            <label>Cantidad L:</label>
            <input
              type='number'
              placeholder='Cantidad de productos en talle L'
              name='cant_l'
              value={producto.cant_l}
              onChange={handleChange}
            />
          </div>
          <div className='add-producto-info-container'>
            <label>Cantidad XL:</label>
            <input
              type='number'
              placeholder='Cantidad de productos en talle XL'
              name='cant_xl'
              value={producto.cant_xl}
              onChange={handleChange}
            />
          </div>
          <div className='add-producto-info-container'>
            <label>Cantidad XXL:</label>
            <input
              type='number'
              placeholder='Cantidad de productos en talle XXL'
              name='cant_xxl'
              value={producto.cant_xxl}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className='add-producto-button-container'>
          <Boton
            secundario
            textBoton='Salir'
            value='Salir'
            onClick={onClick}
          />
          <Boton
            textBoton='Guardar'
            onClick={handleUpdate}
          />
        </div>
      </motion.section>
    </div>
  );
}
