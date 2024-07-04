import { useState } from 'react';
import { Boton } from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import { usePedido } from '../../context/PedidosContext';
import { toast } from 'sonner';
import './Contacto.css';

export function Contacto() {
  const { sendEmail } = usePedido();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // Previene la redirección del formulario

    const to = 'tiagorodriguez0202@gmail.com'; // Corrige el email aquí
    const html = `
      <h1>Consulta de usuario</h1>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `;
    sendEmail(to, subject, html);
    toast.success('Mensaje enviado correctamente');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <section>
      <form
        onSubmit={onSubmit}
        className='contacto'
      >
        <div className='contacto-texto-container'>
          <p>Contactate con nosotros</p>
        </div>

        <div className='datos-container'>
          <Input
            type='email'
            placeholder='ejemplo@gmail.com'
            label='Correo electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type='text'
            placeholder='Ingrese el asunto'
            label='Asunto'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label className='contacto-label'>Mensaje</label>
          <textarea
            className='contenido'
            placeholder='Ingresa tu consulta'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Boton
            type='submit'
            textBoton='Enviar'
          />
        </div>
      </form>
    </section>
  );
}
