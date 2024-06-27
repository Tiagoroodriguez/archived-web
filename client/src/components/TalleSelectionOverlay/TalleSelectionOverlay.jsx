import { useContext, useRef } from 'react';
import { CartContext } from '../../context/CarritoContext';
import './TalleSelectionOverlay.css';
import { Boton } from '../Boton/Boton';

export default function TalleSelectionOverlay() {
  const { overlayTalles, setOverlayTalles, addToCart, selectedProduct } =
    useContext(CartContext);

  const overlayRef = useRef(null);

  const handleClickOutside = (event) => {
    if (overlayRef.current && overlayRef.current === event.target) {
      setOverlayTalles(false);
    }
  };

  const handleAddToCart = (talle) => {
    if (selectedProduct && talle) {
      addToCart(selectedProduct, talle);
      setOverlayTalles(false);
    }
  };

  return (
    <div
      className={
        overlayTalles
          ? 'overlay-container mostrar-talles'
          : 'overlay-container ocultar-talles'
      }
      onClick={handleClickOutside}
      ref={overlayRef}
    >
      <div className='overlay-talle'>
        <p>Seleccione un talle</p>
        <ul className='overlay-talle-list'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((talle) => (
            <li key={talle}>
              <Boton
                textBoton={talle}
                secundario
                desactivado={
                  selectedProduct[`cant_${talle.toLowerCase()}`] === 0
                }
                onClick={() => {
                  handleAddToCart(talle);
                }}
                value={talle}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
