import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Boton } from '../../components/Boton/Boton';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import Input from '../../components/Input/Input';

import './CrearCuenta.css';

export function CrearCuenta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
  });

  return (
    <div className='cuenta-container'>
      <aside>
        <div className='aside-img-container'>
          <img src='/images/cuenta.webp' />
        </div>
      </aside>
      <main>
        <LogoTexto />

        <form
          className='form-cuenta'
          onSubmit={onSubmit}
        >
          <div className='cuenta-texto-container'>
            <h1>Crea tu cuenta</h1>
            <p>
              Completa los datos y abre un cuenta para comprar mas rapido y
              llevar un control de tus pedidos
            </p>
          </div>

          <div className='cuenta-datos-container'>
            {registerErrors.map((error, i) => (
              <div
                className='cartel-error'
                key={i}
              >
                {error}
              </div>
            ))}
            <Input
              type='text'
              placeholder='Ingresa tu nombre'
              label='Nombre'
              ternaria={register('nombre', { required: true })}
            />
            {errors.nombre && <p className='error'>El nombre es requerido</p>}

            <Input
              type='text'
              placeholder='Ingresa tu apellido'
              label='Apellido'
              ternaria={register('apellido', { required: true })}
            />
            {errors.apellido && (
              <p className='error'>El apellido es requerido</p>
            )}

            <Input
              type='email'
              placeholder='ejemplo@gmail.com'
              label='Correo electronico'
              ternaria={register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>El correo electrónico es requerido</p>
            )}

            <Input
              type='password'
              placeholder='*********'
              label='Contraseña'
              ternaria={register('password', { required: true })}
            />
            {errors.password && (
              <p className='error'>La contraseña es requerida</p>
            )}

            <Boton
              type='sudmit'
              textBoton='Crear cuenta'
            />
          </div>

          <p className='crear-cuenta-cambio'>
            ¿Ya tenés una cuenta? <Link to='/login'>Iniciá sesión</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
