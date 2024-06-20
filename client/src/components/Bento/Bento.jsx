import { Link } from 'react-router-dom';
import './Bento.css';

export default function Bento() {
  return (
    <section className='grid-container'>
      <Link
        to='/tienda?categoria=remera'
        className='grid-item item-1'
        data-text='Remeras'
      >
        <img
          src='/images/bento/remera.jpg'
          alt='Seccion de remeras'
        />
      </Link>
      <Link
        to='/tienda?categoria=all'
        className='grid-item item-2'
        data-text='Todos los productos'
      >
        <img
          src='/images/bento/oufit-1.png'
          alt='Seccion de tienda'
        />
      </Link>
      <div
        className='grid-item item-3'
        data-text='Coleccion 2024'
      >
        <img
          src='/images/bento/oufit-2.jpg'
          alt='Coleccion 2024'
        />
      </div>
      <div
        className='grid-item item-4'
        data-text='Accesorios'
      >
        <img
          src='/images/bento/gorra.jpg'
          alt='Seccion de accesorios'
        />
      </div>
      <Link
        to='/tienda?categoria=buzo'
        className='grid-item item-5'
        data-text='Buzos'
      >
        <img
          src='/images/bento/oufit-4.jpg'
          alt='Seccion de buzos'
        />
      </Link>
    </section>
  );
}
