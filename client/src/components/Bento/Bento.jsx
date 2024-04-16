import { Link } from 'react-router-dom';
import './Bento.css';

export default function Bento() {
  return (
    <section className='grid-container'>
      <div
        className='grid-item item-1'
        data-text='Remeras'
      >
        <img src='/images/bento/remera.jpg' />
      </div>
      <Link
        to='/tienda'
        className='grid-item item-2'
        data-text='Todos los productos'
      >
        <img src='/images/bento/oufit-1.png' />
      </Link>
      <div
        className='grid-item item-3'
        data-text='Coleccion 2024'
      >
        <img src='/images/bento/oufit-2.jpg' />
      </div>
      <div
        className='grid-item item-4'
        data-text='Accesorios'
      >
        <img src='/images/bento/gorra.jpg' />
      </div>
      <div
        className='grid-item item-5'
        data-text='Buzos'
      >
        <img src='/images/bento/oufit-4.jpg' />
      </div>
    </section>
  );
}
