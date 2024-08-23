import { Link } from 'react-router-dom';
import './LogoTexto.css';

export function LogoTexto({ blanco }) {
  return (
    <Link
      to='/'
      className='logo'
    >
      {blanco ? (
        <img
          src='../../../public/svg/archived-blanco.svg'
          alt='My Icon'
          width='120'
          height='120'
        />
      ) : (
        <img
          src='../../../public/svg/archived.svg'
          alt='My Icon'
          width='120'
          height='120'
        />
      )}
    </Link>
  );
}
