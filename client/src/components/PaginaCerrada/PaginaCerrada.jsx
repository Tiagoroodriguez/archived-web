import { useState } from 'react';
import { Boton } from '../Boton/Boton';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function PaginaCerrada() {
  const password = 'archived132459';
  const [inputContent, setInputContent] = useState('');
  const navigate = useNavigate();

  const handdleSubmit = () => {
    if (inputContent === password) {
      toast.success('Password correcta');
      navigate('/inicio');
    } else {
      toast.error('Password incorrecta');
    }
  };

  return (
    <div>
      <div className='absolute z-[100] w-full h-[100vh]'>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold uppercase'>Pagina cerrada</h1>
          <p className='pb-4 text-slate-50 font-semibold '>
            Vuelve el 17/10 a las 21:00 hrs
          </p>
          <input
            type='password'
            placeholder='Contraseña'
            className='p-2 border border-gray-300 rounded-md shadow-none w-[250px]'
            onChange={(e) => setInputContent(e.target.value)}
          />
          <div className='w-[250px]'>
            <Boton
              textBoton='Ingresar'
              value='Ingresar'
              onClick={handdleSubmit}
            />
          </div>
        </div>
      </div>
      <section className='h-[100vh] hero-container'>
        <picture className='hero-img-container'>
          <img
            src='images/banner_pc.webp'
            alt='Banner de la colección Casa de Campo'
            className='hero-background hero-img-pc blur-md'
          />
          <img
            src='images/banner_celu.webp'
            alt='Banner de la colección Casa de Campo'
            className='hero-background hero-img-mobile blur-md'
          />
        </picture>
      </section>
    </div>
  );
}
