import { Link } from 'react-router-dom';
import './LogoTexto.css';

export function LogoTexto() {
  return (
    <Link
      to='/'
      className='logo'
    >
      <span className='text'>Archived</span>
      <span className='r'>®</span>
    </Link>
  );
}
