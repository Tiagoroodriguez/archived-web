import { useEffect, useState } from 'react';
import { Boton } from '../Boton/Boton';
import { useProduct } from '../../context/ProductContext';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { formatDate } from '../../utils/formatDate';
import { motion } from 'framer-motion';

export default function Descuentos({ onClick, id }) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [producto, setProducto] = useState({});
  const [discount, setDiscount] = useState({
    product_id: id,
    discount_percentage: '',
    start_date: '',
    end_date: '',
  });
  const { createDiscount, getProduct, deleteDiscount } = useProduct();

  const handleInputChange = (e) => {
    setDiscount({
      ...discount,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await createDiscount(discount);
    toast.success('Descuento creado con exito');
    onClick();
  };

  const handleDeleteDiscount = async (id) => {
    await deleteDiscount(id);
    toast.success('Descuento eliminado con exito');
    onClick();
  };

  useEffect(() => {
    if (initialLoad) {
      getProduct(id).then((res) => {
        setProducto(res);
      });
      setInitialLoad(false);
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
            <i className='bi bi-tag-fill' />
            Descuento
          </h1>
          <p>Agrega un descuento a un producto a tu tienda.</p>
          <button
            className='boton-salir'
            onClick={onClick}
          >
            <i className='bi bi-x' />
          </button>
        </header>

        <form className='add-producto-form'>
          <div className='add-producto-info-container'>
            <label>Descuento:</label>
            <input
              type='number'
              placeholder='Agregar descuento'
              name='discount_percentage'
              onChange={handleInputChange}
              disabled={producto.discount}
              className={producto.discount ? 'disabled' : ''}
            />
          </div>
          <div className='add-producto-info-container'>
            <label>Fecha de inicio:</label>
            <input
              type='date'
              name='start_date'
              onChange={(e) =>
                setDiscount({ ...discount, start_date: e.target.value })
              }
              disabled={producto.discount}
              className={producto.discount ? 'disabled' : ''}
            />
          </div>
          <div className='add-producto-info-container'>
            <label>Fecha de finalizacion:</label>
            <input
              type='date'
              name='end_date'
              onChange={(e) =>
                setDiscount({ ...discount, end_date: e.target.value })
              }
              disabled={producto.discount}
              className={producto.discount ? 'disabled' : ''}
            />
          </div>
          {producto.discount
            ? producto.discount.discount_percentage > 0 && (
                <div className='descuento-mensaje'>
                  <p>
                    Actualmente el producto tiene un descuento del{' '}
                    <strong>{producto.discount.discount_percentage}%</strong>
                  </p>
                  <p>
                    Activo desde el{' '}
                    <strong>{formatDate(producto.discount.start_date)}</strong>{' '}
                    hasta{' '}
                    <strong>{formatDate(producto.discount.end_date)}</strong>
                  </p>
                  <button
                    onClick={() => handleDeleteDiscount(producto.discount.id)}
                  >
                    <i className='bi bi-trash' /> Eliminar descuento
                  </button>
                </div>
              )
            : ''}
        </form>
        <div className='add-producto-button-container'>
          <Boton
            secundario
            textBoton='Salir'
            value='Salir'
            onClick={onClick}
          />
          <Boton
            textBoton='Crear descuento'
            onClick={handleSubmit}
            desactivado={producto.discount}
          />
        </div>
      </motion.section>
    </div>
  );
}
