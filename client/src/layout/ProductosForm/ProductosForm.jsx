import { useForm } from 'react-hook-form';

import './ProductosForm.css';
import { BotonRojo } from '../../components/BotonRojo/BotoRojo';
import { useProduct } from '../../context/ProductContext';

function ProductosForm() {
  const { register, handleSubmit } = useForm();
  const { createProduct } = useProduct();

  const onSudmit = handleSubmit((data) => {
    createProduct(data);
  });
  return (
    <>
      <form
        className='productos-form'
        onSubmit={onSudmit}
      >
        <input
          className='informacion'
          type='text'
          placeholder='Nombre'
          {...register('nombre')}
          autoFocus
        />
        <input
          className='informacion'
          type='text'
          placeholder='Categoria'
          {...register('categoria')}
        />
        <input
          className='informacion'
          type='number'
          placeholder='Precio'
          {...register('precio')}
        />
        <input
          className='informacion'
          type='number'
          placeholder='Cantidad S'
          {...register('cant_s')}
        />
        <input
          className='informacion'
          type='number'
          placeholder='Cantidad M'
          {...register('cant_m')}
        />
        <input
          className='informacion'
          type='number'
          placeholder='Cantidad L'
          {...register('cant_l')}
        />
        <input
          className='informacion'
          type='number'
          placeholder='Cantidad XL'
          {...register('cant_xl')}
        />
        <input
          className='informacion'
          type='number'
          placeholder='Cantidad XXL'
          {...register('cant_xxl')}
        />
        <div className='boton-container'>
          <BotonRojo
            textBoton='Guardar'
            type='sudmit'
          />
        </div>
      </form>
    </>
  );
}

export default ProductosForm;
