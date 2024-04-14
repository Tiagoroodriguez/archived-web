import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { BotonRojo } from '../../components/BotonRojo/BotoRojo';

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
    <>
      <section>
        {registerErrors.map((error, i) => (
          <div
            className='cartel-error'
            key={i}
          >
            {error}
          </div>
        ))}
        <form
          className='crear-cuenta'
          onSubmit={onSubmit}
        >
          <div className='texto-container'>
            <p>Comprá más rapido y llevá el control de tus pedidos</p>
          </div>

          <div className='datos-container'>
            <label>Nombre</label>
            <input
              type='text'
              className='nombre'
              {...register('nombre', { required: true })}
            />
            {errors.nombre && <p className='error'>El nombre es requerido</p>}

            <label>Apellido</label>
            <input
              type='text'
              className='apellido'
              {...register('apellido', { required: true })}
            />
            {errors.apellido && (
              <p className='error'>El apellido es requerido</p>
            )}

            <label>Correo electrónico</label>
            <input
              type='email'
              placeholder='ejemplo@gmail.com'
              className='mail'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>El correo electrónico es requerido</p>
            )}

            {/*
                        <label>Teléfono</label>
                        <input type="text" className="telefono" />
                        */}

            <label>Contraseña</label>
            <input
              type='password'
              className='contraseña'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className='error'>La contraseña es requerida</p>
            )}

            <BotonRojo
              type='sudmit'
              textBoton='Crear cuenta'
            />
          </div>

          <p className='crear-cuenta-cambio'>
            ¿Ya tenés una cuenta? <Link to='/login'>Iniciá sesión</Link>
          </p>
        </form>
      </section>
    </>
  );
}
