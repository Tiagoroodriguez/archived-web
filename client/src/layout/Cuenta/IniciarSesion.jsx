import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
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
    <div className='cuenta-container'>
      <main>
        <Link to='/'>
          <LogoTexto />
        </Link>
        <form
          onSubmit={onSubmit}
          className='form-cuenta'
        >
          <div className='cuenta-texto-container'>
            <h1>Inicia sesión</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, assumenda. Animi magni eos optio perferendis sunt,
              eveniet quasi, illum maxime facere delectus veritatis quaerat
              officia. Voluptatibus molestiae odio unde praesentium.
            </p>
          </div>
          <div className='cuenta-datos-container'>
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
              label='Correo electronico'
              ternaria={register('email', { required: true })}
            />
            {errors.email && (
              <p className='error'>Correo electrónico es requerido</p>
            )}

            <Input
              type='password'
              label='Contraseña'
              ternaria={register('password', { required: true })}
            />
            {errors.password && (
              <p className='error'>Contraseña es requerida</p>
            )}
            <label className='label-contraseña'>Olvidaste tu contraseña?</label>

            <Boton
              type='sudmit'
              textBoton='Iniciar sesión'
            />
          </div>
          <p className='iniciar-sesion-cambio'>
            ¿No tenés cuenta? <Link to='/register'>Crear cuenta</Link>
          </p>
        </form>
      </main>
      <aside>
        <div className='aside-img-container'>
          <img src='/images/doku-europe-finesse-records-3.jpg' />
        </div>
      </aside>
    </div>
  );
}
