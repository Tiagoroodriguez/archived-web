import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

import { Boton } from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';

import './IniciarSesion.css';

export function IniciarSesion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singin, errors: singInErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((date) => {
    singin(date);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <>
      <section>
        <form
          onSubmit={onSubmit}
          className='iniciar-sesion'
        >
          <div className='texto-container'>
            <p>Inicia sesión</p>
          </div>
          <div className='datos-container'>
            {singInErrors.map((error, i) => (
              <div
                className='cartel-error'
                key={i}
              >
                {error}
              </div>
            ))}

            <Input
              type='email'
              placeholder='ejemplo@gmail.com'
              label='Contraseña'
              ternaria={register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>Correo electrónico es requerido</p>
            )}

            <Input
              type='password'
              placeholder='*********'
              label='Contraseña'
              ternaria={register('password', { required: true })}
            />
            {errors.password && (
              <p className='error'>Contraseña es requerida</p>
            )}

            <Boton
              type='sudmit'
              textBoton='Iniciar sesión'
            />
          </div>
          <p className='iniciar-sesion-cambio'>
            ¿No tenés cuenta? <Link to='/register'>Crear cuenta</Link>
          </p>
        </form>
      </section>
    </>
  );
}
