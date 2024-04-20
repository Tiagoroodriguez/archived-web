import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

import { Boton } from '../../components/Boton/Boton';

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

            <label>Correo electrónico</label>
            <input
              type='email'
              placeholder='ejemplo@gmail.com'
              className='mail'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>Correo electrónico es requerido</p>
            )}

            <label>Contraseña</label>
            <input
              type='password'
              placeholder='*********'
              className='contraseña'
              {...register('password', { required: true })}
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
