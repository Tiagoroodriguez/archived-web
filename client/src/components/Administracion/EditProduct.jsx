import { useEffect, useState } from 'react';
import { Boton } from '../Boton/Boton.jsx';
import { useProduct } from '../../context/ProductContext.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';

export default function EditProduct({ onClick, id }) {
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

  const [descripcion, setDescripcion] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const { getProduct, updateProduct } = useProduct();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...producto,
        descripcion,
      };
      await updateProduct(updatedProduct);
      toast.success('Producto actualizado correctamente');
      onClick();
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el producto');
    }
  };

  useEffect(() => {
    if (initialLoad) {
      const fetchProduct = async () => {
        try {
          const res = await getProduct(id);
          setProducto(res);
          setDescripcion(res.descripcion);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
      setInitialLoad(false);
    }
  }, [initialLoad, getProduct]);

  return (
    <div className='add-producto-container'>
      <section className='add-producto-form-container'>
        <header className='add-producto-form-header'>
          <h1>
            <i className='bi bi-archive-fill' />
            Modificar producto
          </h1>
          <p>Modifica los datos de un producto de tu tienda.</p>
          <button
            className='boton-salir'
            onClick={onClick}
          >
            <i className='bi bi-x' />
          </button>
        </header>

        <form className='update-producto-form'>
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
          </div>
        </form>
        <div className='add-producto-button-container'>
          <Boton
            secundario
            textBoton='Salir'
            value='Salir'
            onClick={onClick}
          />
          <Boton
            textBoton='Guardar'
            onClick={handleUpdate}
          />
        </div>
      </section>
    </div>
  );
}
