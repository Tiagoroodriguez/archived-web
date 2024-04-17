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
            <span>Envianos tu duda</span>
          </div>

          <div className='datos-container'>
            <label>Correo electrónico</label>
            <input
              type='email'
              className='mail'
            />

            <label>Asunto</label>
            <input
              type='text'
              className='asunto'
            />

            <label>Mensaje</label>
            <textarea className='contenido'></textarea>
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
