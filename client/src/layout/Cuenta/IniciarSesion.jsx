import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

import { LogoTexto } from '../../components/LogoTexto/LogoTexto';
import { Boton } from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';

import './IniciarSesion.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import axios from '../../api/axios.js';
import { toast } from 'sonner';

export function IniciarSesion() {
  const [recuperar, setRecuperar] = useState(false);
  const [email, setEmail] = useState('');

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

  const handleRecuperar = () => {
    setRecuperar(!recuperar);
  };

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  const handleEnviarSolicitud = async (email) => {
    if (email) {
      await axios.post('/solicitar-recuperacion', { email: email });
      toast.success('Correo enviado con exito!');
      setRecuperar(!recuperar);
      setEmail('');
    } else {
      toast.error('Debe ingresar el correo electronico!');
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <div className='cuenta-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Login | Archived</title>
        <meta
          name='description'
          content='Pagina de inicio de sesion'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/login'
        />
      </Helmet>
      <main>
        <LogoTexto />
        <form
          onSubmit={onSubmit}
          className='form-cuenta'
        >
          <div className='cuenta-texto-container'>
            <h1>Inicia sesión</h1>
            <p>Ingresa tu cuenta y lleva el control de tus pedidos</p>
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
            <label
              className='label-contraseña'
              onClick={handleRecuperar}
            >
              Olvidaste tu contraseña?
            </label>

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
          <img src='/images/cuenta.webp' />
        </div>
      </aside>
      <AnimatePresence>
        {recuperar && (
          <div className='absolute w-full h-full z-100 bg-[#0000003a] flex items-center justify-center'>
            <motion.div
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={variants}
              transition={{ duration: 0.3 }}
              className='relative w-[500px] h-[250px] bg-[#f2f2f2] shadow-[rgba(17,12,46,0.15)_0px_48px_100px_0px] rounded-[5px] flex flex-col items-center justify-center gap-[15px]'
            >
              <button
                className='boton-salir-recuperar'
                onClick={handleRecuperar}
              >
                <i className='bi bi-x' />
              </button>
              <h1 className='text-[#1A1F25] font-semibold text-lg'>
                Recupera tu cuenta
              </h1>
              <p className='text-xs w-[70%] opacity-[60%] text-center'>
                Recibiras un correo electronico con los pasos a seguir para
                recuperar tu cuenta.
              </p>
              <input
                placeholder='Ingresa tu correo electronico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='input-recuperar transition-all text-sm rounded-[5px] border-[1px] border-[#2e373e83] w-[70%] px-[5px] py-[7px] bg-transparent'
              />
              <button
                onClick={() => handleEnviarSolicitud(email)}
                className='boton-recuperar py-[7px] px-[10px] text-sm rounded-[5px] bg-[#2E373E] text-[#f2f2f2] w-[70%]'
              >
                Solicitar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
