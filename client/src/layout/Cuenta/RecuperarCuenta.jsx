import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';
import { toast } from 'sonner';
import { Boton } from '../../components/Boton/Boton.jsx';
import Input from '../../components/Input/Input.jsx';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RecuperarCuenta() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState(false);
  const token = useParams().token;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    try {
      await axios.post('/restablecer', {
        token,
        newPassword: password,
      });
      toast.success('Contraseña restablecida correctamente');
      navigate('/login');
    } catch (error) {
      toast.error('Error al restablecer la contraseña. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  const onChange = () => {
    setCaptcha(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='h-[80vh] flex flex-col justify-center items-center gap-[10px]'
    >
      <div className='w-full text-center'>
        <h1 className='text-xl text-[#1A1F25] font-semibold'>
          Crea un nueva contraseña
        </h1>
        <p className='text-xs text-[#1A1F25] font-normal opacity-[60%]'>
          Asegurate de que tu contraseña sea segura y facil de recordar.
        </p>
      </div>

      <div className='w-full px-[20px] flex flex-col gap-[10px] md:w-[30%] md:px-0'>
        <Input
          label='Nueva contraseña'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label='Confirmar nueva contraseña'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className='flex flex-col items-center'>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
            onChange={onChange}
          />
        </div>
        <Boton
          type='submit'
          desactivado={!captcha}
          textBoton='Restablecer contraseña'
        />
      </div>
    </form>
  );
}
