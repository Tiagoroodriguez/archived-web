import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Boton } from '../../components/Boton/Boton';

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
            <p>Crea tu cuenta</p>
          </div>

          <div className='datos-container'>
            <label>Nombre</label>
            <input
              type='text'
              placeholder='Ingresa tu nombre'
              className='nombre'
              {...register('nombre', { required: true })}
            />
            {errors.nombre && <p className='error'>El nombre es requerido</p>}

            <label>Apellido</label>
            <input
              type='text'
              placeholder='Ingresa tu apellido'
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
              placeholder='*********'
              className='contraseña'
              {...register('password', { required: true })}
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
      </section>
    </>
  );
}
