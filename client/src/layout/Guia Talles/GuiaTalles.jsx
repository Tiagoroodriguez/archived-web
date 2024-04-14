import { Tabla } from '../../components/Tabla/Tabla';
import './GuiaTalles.css';

export function GuiaTalles() {
  return (
    <>
      <section className='guia-container'>
        <Tabla
          producto={'Remera "Archived"'}
          sAncho={'10'}
          sLargo={'20'}
          mAncho={'10'}
          mLargo={'20'}
          lAncho='10'
          lLargo='20'
          xlAncho={'10'}
          xlLargo={'20'}
        />

        <Tabla
          producto={'Remera "Archived"'}
          sAncho={'10'}
          sLargo={'20'}
          mAncho={'10'}
          mLargo={'20'}
          lAncho='10'
          lLargo='20'
          xlAncho={'10'}
          xlLargo={'20'}
        />
      </section>

      <p className='mensaje-talles'>
        "Todas las medidas estan expresadas en centimetros"
      </p>
    </>
  );
}
