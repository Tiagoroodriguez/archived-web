import { useState } from 'react';
import { Boton } from '../Boton/Boton';
import { useProduct } from '../../context/ProductContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilos por defecto
import axios from '../../api/axios.js';
import { toast } from 'sonner';

export default function AddProducto({ onClick }) {
  const modules = {
    toolbar: [
      // Quita las opciones de header
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // Formatos permitidos
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      // ['link', 'image'],
      [{ align: [] }],
      //[{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  const [imageUrls, setImageUrls] = useState({
    img_small_1: '',
    img_small_2: '',
    img_big_1: '',
    img_big_2: '',
    img_big_3: '',
    img_big_4: '',
  });
  const [descripcion, setDescripcion] = useState('');

  const { createProduct } = useProduct();
  const [paso, setPaso] = useState(1);
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    coleccion: '',
    descripcion: '',
    cant_s: 0,
    cant_m: 0,
    cant_l: 0,
    cant_xl: 0,
    cant_xxl: 0,
  });

  const handleDescripcionChange = (content) => {
    setDescripcion(content);
  };
  const handlePaso = () => setPaso(paso + 1);
  const handleVolverPaso = () => setPaso(paso - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleImageUpload = async (e, folder, key) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.imageUrl) {
        setImageUrls((prev) => ({
          ...prev,
          [key]: res.data.imageUrl,
        }));
      } else {
        console.error('No se recibió URL de la imagen');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleSubmit = async () => {
    try {
      const productoConImagenes = {
        ...producto,
        descripcion: descripcion,
        ...imageUrls, // Agrega las URLs de las imágenes al producto
      };

      await createProduct(productoConImagenes);
      setProducto({
        nombre: '',
        precio: '',
        categoria: '',
        coleccion: '',
        descripcion: '',
        cant_s: 0,
        cant_m: 0,
        cant_l: 0,
        cant_xl: 0,
        cant_xxl: 0,
      });
      toast.success('Producto creado con éxito');

      setDescripcion(''); // Limpia la descripción después de guardar el producto
      setImageUrls({
        img_small_1: '',
        img_small_2: '',
        img_big_1: '',
        img_big_2: '',
        img_big_3: '',
        img_big_4: '',
      });
      setPaso(1);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el producto');
    }
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
                  value={producto.nombre}
                  onChange={handleChange}
                  name='nombre'
                />
                <p>Dale a tu producto un nombre corto y claro.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Precio:</label>
                <input
                  type='number'
                  placeholder='Precio del producto'
                  value={producto.precio}
                  onChange={handleChange}
                  name='precio'
                />
                <p>Ingresa el valor sin , ni .</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Categoria:</label>
                <select
                  name='categoria'
                  value={producto.categoria}
                  onChange={handleChange}
                >
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
                <select
                  name='coleccion'
                  value={producto.coleccion}
                  onChange={handleChange}
                >
                  <option value=''>Selecciona la coleccion</option>
                  <option value='casa-campo'>Casa de campo</option>
                  <option value='archived'>Archived</option>
                  <option value='none'>None</option>
                </select>

                <p>Selecciona la categoria de tu producto.</p>
              </div>
              <div className='add-producto-info-container'>
                <label>Descripcion:</label>
                <ReactQuill
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  modules={modules}
                  formats={formats}
                />
                {/*<textarea
                  placeholder='Descripcion del producto'
                  name='descripcion'
                  value={producto.descripcion}
                  onChange={handleChange}
                />
                <p>Dale a tu producto una descripcion corta y clara.</p>
                */}
              </div>
            </>
          )}

          {paso === 2 && (
            <>
              <div className='add-producto-info-container'>
                <label>Cantidad S:</label>
                <input
                  type='number'
                  placeholder='Cantidad de productos en talle S'
                  name='cant_s'
                  value={producto.cant_s}
                  onChange={handleChange}
                />
              </div>
              <div className='add-producto-info-container'>
                <label>Cantidad M:</label>
                <input
                  type='number'
                  placeholder='Cantidad de productos en talle M'
                  name='cant_m'
                  value={producto.cant_m}
                  onChange={handleChange}
                />
              </div>
              <div className='add-producto-info-container'>
                <label>Cantidad L:</label>
                <input
                  type='number'
                  placeholder='Cantidad de productos en talle L'
                  name='cant_l'
                  value={producto.cant_l}
                  onChange={handleChange}
                />
              </div>
              <div className='add-producto-info-container'>
                <label>Cantidad XL:</label>
                <input
                  type='number'
                  placeholder='Cantidad de productos en talle XL'
                  name='cant_xl'
                  value={producto.cant_xl}
                  onChange={handleChange}
                />
              </div>
              <div className='add-producto-info-container'>
                <label>Cantidad XXL:</label>
                <input
                  type='number'
                  placeholder='Cantidad de productos en talle XXL'
                  name='cant_xxl'
                  value={producto.cant_xxl}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {paso === 3 && (
            <div className='add-product-img-container'>
              <div className='add-producto-imagen-container'>
                <h2>Imagenes de previsualizacion del producto</h2>
                <div className='img-productos-card'>
                  <div>
                    <div className='img-product-container'>
                      {imageUrls.img_small_1 ? (
                        <img
                          src={imageUrls.img_small_1}
                          alt='Imagen 1'
                        />
                      ) : (
                        <input
                          type='file'
                          onChange={(e) =>
                            handleImageUpload(e, 'small', 'img_small_1')
                          }
                        />
                      )}
                    </div>
                    <label>Product card image 1 (frente)</label>
                  </div>
                  <div>
                    <div className='img-product-container'>
                      {imageUrls.img_small_2 ? (
                        <img
                          src={imageUrls.img_small_2}
                          alt='Imagen 2'
                        />
                      ) : (
                        <input
                          type='file'
                          onChange={(e) =>
                            handleImageUpload(e, 'small', 'img_small_2')
                          }
                        />
                      )}
                    </div>
                    <label>Product card image 2 (espalda)</label>
                  </div>
                </div>
              </div>
              <div className='add-producto-imagen-container'>
                <h2>Imagenes de detalle del producto</h2>
                <div className='img-productos-detalle'>
                  <div>
                    <div className='img-product-container'>
                      {imageUrls.img_big_1 ? (
                        <img
                          src={imageUrls.img_big_1}
                          alt='Imagen 1'
                        />
                      ) : (
                        <input
                          type='file'
                          onChange={(e) =>
                            handleImageUpload(e, 'big', 'img_big_1')
                          }
                        />
                      )}
                    </div>
                    <label>Product detail image 1</label>
                  </div>
                  <div>
                    <div className='img-product-container'>
                      {imageUrls.img_big_2 ? (
                        <img
                          src={imageUrls.img_big_2}
                          alt='Imagen 2'
                        />
                      ) : (
                        <input
                          type='file'
                          onChange={(e) =>
                            handleImageUpload(e, 'big', 'img_big_2')
                          }
                        />
                      )}
                    </div>
                    <label>Product detail image 2</label>
                  </div>
                  <div>
                    <div className='img-product-container'>
                      {imageUrls.img_big_3 ? (
                        <img
                          src={imageUrls.img_big_3}
                          alt='Imagen 3'
                        />
                      ) : (
                        <input
                          type='file'
                          onChange={(e) =>
                            handleImageUpload(e, 'big', 'img_big_3')
                          }
                        />
                      )}
                    </div>
                    <label>Product detail image 3</label>
                  </div>
                  <div>
                    <div className='img-product-container'>
                      {imageUrls.img_big_4 ? (
                        <img
                          src={imageUrls.img_big_4}
                          alt='Imagen 4'
                        />
                      ) : (
                        <input
                          type='file'
                          onChange={(e) =>
                            handleImageUpload(e, 'big', 'img_big_4')
                          }
                        />
                      )}
                    </div>
                    <label>Product detail image 4</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
        <div className='add-producto-button-container'>
          <Boton
            secundario
            textBoton='Volver'
            value='Volver'
            onClick={handleVolverPaso}
          />
          {paso < 3 && (
            <Boton
              textBoton='Continuar'
              onClick={handlePaso}
            />
          )}
          {paso === 3 && (
            <Boton
              textBoton='Guardar'
              onClick={handleSubmit}
            />
          )}

          {paso === 0 && onClick()}
        </div>
      </section>
    </div>
  );
}
