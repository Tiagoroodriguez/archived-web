import { useEffect, useState } from 'react';
import { Boton } from '../Boton/Boton';
import { useProduct } from '../../context/ProductContext';
import 'react-quill/dist/quill.snow.css'; // Estilos por defecto
import { toast } from 'sonner';

export default function Descuentos({ onClick, id }) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [producto, setProducto] = useState({});
  const [discount, setDiscount] = useState({
    product_id: id,
    discount_percentage: '',
    start_date: '',
    end_date: '',
  });
  const { createDiscount, getProduct } = useProduct();

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

  useEffect(() => {
    if (initialLoad) {
      getProduct(id).then((res) => {
        setProducto(res);
      });
      setInitialLoad(false);
    }
  }, [initialLoad, getProduct, id]);
  console.log(producto);
  return (
    <div className='add-producto-container'>
      <section className='add-producto-form-container'>
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
            textBoton='Crear descuento'
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
}
