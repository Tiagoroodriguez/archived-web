import { useState } from 'react';
import { Boton } from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import { usePedido } from '../../context/PedidosContext';
import { toast } from 'sonner';
import './Contacto.css';
import { Helmet } from 'react-helmet';

export function Contacto() {
  const { sendEmail } = usePedido();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // Previene la redirección del formulario

    const to = 'archived.system.222@gmail.com';
    const html = `
      <h1>Consulta de usuario</h1>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `;
    //const subject = `Consulta de usuario: ${subject}`;
    sendEmail(to, subject, html);
    toast.success('Mensaje enviado correctamente');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <section>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Contacto | Archived</title>
        <meta
          name='description'
          content='Pagina de contacto'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/contacto'
        />
      </Helmet>
      <form
        onSubmit={onSubmit}
        className='contacto'
      >
        <div className='contacto-texto-container'>
          <h1>
            <i className='bi bi-envelope' />
            Contáctanos
          </h1>
          <p>
            Déjanos tu mensaje y nos pondremos en contacto contigo a la
            brevedad.
          </p>
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
