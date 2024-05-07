import { Boton } from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';

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
            <Input
              type='email'
              placeholder='ejemplo@gmail.com'
              label='Correo electrónico'
            />

            <Input
              type='text'
              placeholder='Ingrese el asusto'
              label='Asunto'
            />

            <label>Mensaje</label>
            <textarea
              className='contenido'
              placeholder='Ingresa tu consulta'
            />

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
