import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../../context/AuthContext';

import { Boton } from '../../components/Boton/Boton';
import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import Input from '../../components/Input/Input';

import './CrearCuenta.css';
import { subscribeRequest } from '../../api/subscriber';

export function CrearCuenta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singup, isAuthenticated, errors: registerErrors } = useAuth();

  const [captcha, setCaptcha] = useState(false);
  const [terminos, setTerminos] = useState(false);
  const [sub, setSub] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleTerminos = () => {
    setTerminos(!terminos);
  };

  const handleSub = () => {
    setSub(!sub);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
    if (sub) {
      try {
        await subscribeRequest({ email });
        localStorage.setItem('isSubscribed', 'true');
      } catch (error) {
        console.error('Error subscribing', error);
      }
    }
  });

  const onChange = () => {
    setCaptcha(true);
  };

  return (
    <div className='cuenta-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Sing in | Archived</title>
        <meta
          name='description'
          content='Pagina para crear una cuenta'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/register'
        />
      </Helmet>
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
              onChange={(e) => setEmail(e.target.value)}
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

            <div className='condiciones-container'>
              <div>
                <input
                  type='checkbox'
                  onClick={handleTerminos}
                />
                <label>
                  Acepto los{' '}
                  <Link to='/terms-of-service'>términos y condiciones</Link> y
                  la <Link to='/privacy-policy'>política de privacidad</Link>
                </label>
              </div>

              <div>
                <input
                  type='checkbox'
                  onClick={handleSub}
                />
                <label>Quiero recibir ofertas y promociones exclusivas</label>
              </div>
            </div>

            <div className='captcha'>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                onChange={onChange}
              />
            </div>

            <Boton
              type='submit'
              desactivado={!terminos || !captcha}
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
