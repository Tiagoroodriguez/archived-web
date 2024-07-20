import { useContext, useRef } from 'react';
import { CartContext } from '../../context/CarritoContext';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import './TalleSelectionOverlay.css';
import { Boton } from '../Boton/Boton';

export default function TalleSelectionOverlay() {
  const { overlayTalles, setOverlayTalles, addToCart, selectedProduct } =
    useContext(CartContext);

  const overlayRef = useRef(null);
  const y = useMotionValue(0);
  const controls = useDragControls();

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

  const handleDragEnd = () => {
    if (y.get() >= 100) {
      setOverlayTalles(false);
    }
  };

  return (
    <motion.div
      className={`overlay-container ${
        overlayTalles ? 'mostrar-talles' : 'ocultar-talles'
      }`}
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: overlayTalles ? 1 : 0 }}
      onClick={handleClickOutside}
    >
      <motion.div
        className='overlay-talle'
        initial={{ y: '100%' }}
        animate={{ y: overlayTalles ? '0%' : '100%' }}
        transition={{ ease: 'easeInOut' }}
        style={{ y }}
        drag='y'
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='overlay-handle'>
          <button
            onPointerDown={(e) => {
              controls.start(e);
            }}
            className='handle-button'
          ></button>
        </div>
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
                onClick={() => handleAddToCart(talle)}
                value={talle}
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
