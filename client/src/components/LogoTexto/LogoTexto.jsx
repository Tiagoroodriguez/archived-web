import { Link } from 'react-router-dom';
import './LogoTexto.css';

export function LogoTexto({ blanco }) {
  return (
    <Link
      to='/'
      aria-label='Inicio'
      className='logo'
    >
      {blanco ? (
        <img
          src='/svg/logo_archived_blanco.svg'
          alt='Logo de Archived'
          style={{ width: '120px', height: '30px' }}
        />
      ) : (
        <img
          src='/svg/logo_archived_negro.svg'
          alt='Logo de Archived'
          style={{ width: '120px', height: '30px' }}
        />
      )}
    </Link>
  );
}
