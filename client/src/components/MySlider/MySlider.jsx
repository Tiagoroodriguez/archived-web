import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import './MySlider.css';
import { Boton } from '../Boton/Boton';

const MySlider = () => {
  const slides = Array.from({ length: 8 }, (_, index) => (
    <div
      key={index}
      className='slider-item'
    >
      <img
        src={`/images/oufits/oufit-${index}.jpg`}
        draggable='false'
        alt={`Outfit ${index}`}
      />
      <div className='overlay'>
        <div>
          <Boton
            textBoton='SHOP'
            secundario
            value='shop'
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div className='slider-container'>
      <Flicking
        className='flicking-container'
        defaultIndex={0}
        align='prev'
        bound={true}
      >
        {slides}
      </Flicking>
    </div>
  );
};

export default MySlider;
