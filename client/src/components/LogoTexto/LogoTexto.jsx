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
          src='/svg/logo_archived_blanco.svg'
          alt='Logo de Archived'
          width='120'
          height='120'
        />
      ) : (
        <img
          src='/svg/logo_archived_negro.svg'
          alt='Logo de Archived'
          width='120'
          height='120'
        />
      )}
    </Link>
  );
}
