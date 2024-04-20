import { Boton } from '../../components/Boton/Boton';
import './Contacto.css';

export function Contacto() {
  return (
    <>
      <section>
        <form
          action='post'
          className='contacto'
        >
          <div className='contacto-texto-container'>
            <p>Envianos tu duda</p>
          </div>

          <div className='datos-container'>
            <label>Correo electrónico</label>
            <input
              type='email'
              placeholder='ejemplo@gmail.com'
              className='mail'
            />

            <label>Asunto</label>
            <input
              type='text'
              placeholder='Asunto del mensaje'
              className='asunto'
            />

            <label>Mensaje</label>
            <textarea
              className='contenido'
              placeholder='Ingresa tu consulta'
            ></textarea>
            <Boton
              type='sudmit'
              textBoton='Enviar'
            />
          </div>
        </form>
      </section>
    </>
  );
}
