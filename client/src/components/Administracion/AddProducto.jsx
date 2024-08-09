import { useState } from 'react';
import { Boton } from '../Boton/Boton';

export default function AddProducto({ onClick }) {
  const [paso, setPaso] = useState(1);

  const handlePaso = () => {
    setPaso(paso + 1);
  };

  const handleVolverPaso = () => {
    setPaso(paso - 1);
  };

  return (
    <div className='add-producto-container'>
      <section className='add-producto-form-container'>
        <header className='add-producto-form-header'>
          <h1>
            <i className='bi bi-archive-fill' />
            Añadir producto
          </h1>
          <p>Agrega un nuevo producto a tu tienda.</p>
          <button
            className='boton-salir'
            onClick={onClick}
          >
            <i className='bi bi-x' />
          </button>
        </header>
        <div className='add-producto-status'>
          <div className='add-producto-status-nodo focus'>
            <span>01</span>
            <p>General</p>
          </div>
          <div className='line-producto' />
          <div
            className={
              paso === 2 || paso == 3
                ? 'add-producto-status-nodo focus'
                : 'add-producto-status-nodo'
            }
          >
            <span>02</span>
            <p>Stock</p>
          </div>
          <div className='line-producto' />
          <div
            className={
              paso == 3
                ? 'add-producto-status-nodo focus'
                : 'add-producto-status-nodo'
            }
          >
            <span>03</span>
            <p>Archivos</p>
          </div>
        </div>
        <form className='add-producto-form'>
          {paso === 1 && (
            <>
              <div className='add-producto-info-container'>
                <label>Nombre:</label>
                <input
                  type='text'
                  placeholder='Nombre del producto'
                />
                <p>Dale a tu producto un nombre corto y claro.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Precio:</label>
                <input
                  type='number'
                  placeholder='Precio del producto'
                />
                <p>Ingresa el valor sin , ni .</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Categoria:</label>
                <select>
                  <option value=''>Selecciona una categoria</option>
                  <option value='remera'>Remera</option>
                  <option value='buzo'>Buzo</option>
                  <option value='pantalon'>Pantalon</option>
                  <option value='campera'>Campera</option>
                  <option value='short'>Short</option>
                </select>

                <p>Selecciona la categoria de tu producto.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Coleccion:</label>
                <select>
                  <option value=''>Selecciona la coleccion</option>
                  <option value='casa-campo'>Casa de campo</option>
                  <option value='archived'>Archived</option>
                  <option value='none'>None</option>
                </select>

                <p>Selecciona la categoria de tu producto.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Descripcion:</label>
                <textarea placeholder='Descripcion del producto'></textarea>
                <p>Dale a tu producto una descripcion corta y clara.</p>
              </div>
            </>
          )}

          {paso === 2 && (
            <>
              <div className='add-producto-info-container'>
                <label>Cantidad:</label>
                <input
                  type='text'
                  placeholder='Nombre del producto'
                />
                <p>Dale a tu producto un nombre corto y claro.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Precio:</label>
                <input
                  type='number'
                  placeholder='Precio del producto'
                />
                <p>Ingresa el valor sin , ni .</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Categoria:</label>
                <select>
                  <option value=''>Selecciona una categoria</option>
                  <option value='remera'>Remera</option>
                  <option value='buzo'>Buzo</option>
                  <option value='pantalon'>Pantalon</option>
                  <option value='campera'>Campera</option>
                  <option value='short'>Short</option>
                </select>

                <p>Selecciona la categoria de tu producto.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Coleccion:</label>
                <select>
                  <option value=''>Selecciona la coleccion</option>
                  <option value='casa-campo'>Casa de campo</option>
                  <option value='archived'>Archived</option>
                  <option value='none'>None</option>
                </select>

                <p>Selecciona la categoria de tu producto.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Descripcion:</label>
                <textarea placeholder='Descripcion del producto'></textarea>
                <p>Dale a tu producto una descripcion corta y clara.</p>
              </div>
            </>
          )}
        </form>
        <div className='add-producto-button-container'>
          <Boton
            secundario
            textBoton='Volver'
            value='Volver'
            onClick={handleVolverPaso}
          />
          <Boton
            textBoton='Continuar'
            onClick={handlePaso}
          />
          {paso === 0 && onClick()}
        </div>
      </section>
    </div>
  );
}
