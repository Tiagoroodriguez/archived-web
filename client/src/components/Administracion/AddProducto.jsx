export default function AddProducto({ onClick }) {
  return (
    <div className='add-producto-container'>
      <section className='add-producto-form-container'>
        <header className='add-producto-form-header'>
          <h1>
            <i className='bi bi-archive-fill' />
            Add product
          </h1>
          <p>Add a new product to your store.</p>
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
          <div className='add-producto-status-nodo'>
            <span>02</span>
            <p>Pricing</p>
          </div>
          <div className='line-producto' />
          <div className='add-producto-status-nodo'>
            <span>03</span>
            <p>Files</p>
          </div>
        </div>
        <form className='add-producto-form'>
          <div className='add-producto-info-container'>
            <label>Name:</label>
            <input
              type='text'
              placeholder='Product name'
            />
            <p>Give your product a short and clear name.</p>
          </div>

          <div className='add-producto-info-container'>
            <label>Category:</label>
            <select>
              <option value=''>Select category</option>
              <option value='remera'>Remera</option>
              <option value='buzo'>Buzo</option>
              <option value='pantalon'>Pantalon</option>
              <option value='campera'>Campera</option>
              <option value='short'>Short</option>
            </select>

            <p>Select product category.</p>
          </div>

          <div className='add-producto-info-container'>
            <label>Description:</label>
            <textarea placeholder='Product description'></textarea>
            <p>Give your product a short and clear description.</p>
          </div>

          <button type='submit'>
            Next step <i className='bi bi-arrow-right-short' />
          </button>
        </form>
      </section>
    </div>
  );
}
