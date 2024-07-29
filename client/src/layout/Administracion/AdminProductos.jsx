import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

//import { useNavigate } from 'react-router-dom';
//import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { Boton } from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';

export default function AdminProductos() {
  const { user } = useAuth();

  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    imagenes: ['', '', '', ''],
    talles: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTalleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      talles: {
        ...prev.talles,
        [name]: Number(value),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario o manejar los datos
    console.log('Producto añadido:', producto);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.rol != 'admin') {
        navigate('/');
      }
    }
  }, [user]);
  const [categoria, setCategoria] = useState('');

  const handleEstadoChange = async (nuevaCategoria) => {
    setCategoria(nuevaCategoria);
    console.log(categoria);
  };

  const categorias = [
    { id: 1, nombre: 'remera' },
    { id: 2, nombre: 'buzo' },
    { id: 3, nombre: 'accesorio' },
  ];

  if (!user) {
    return <div className='pedido-load'>Cargando...</div>;
  }

  return (
    <>
      <main className='admin-productos'>
        <section className='detalle-container-admin'>
          <div className='img-container-admin'>
            {producto.imagenes.map((index) => (
              <div
                key={index}
                className='img-file'
              >
                <input type='file' />
              </div>
            ))}
          </div>

          <form
            className='informacion-container-admin'
            onSubmit={handleSubmit}
          >
            <div className='informacion-dp'>
              <Input
                label='Nombre del producto'
                type='text'
                value={producto.nombre}
                onChange={handleChange}
              />

              <Select
                labelText='Categoría'
                onChange={handleEstadoChange}
                value={categoria}
                data={categorias}
              />

              <Input
                label='Precio'
                type='number'
                value={producto.precio}
                onChange={handleChange}
              />

              <textarea
                name='descripcion'
                placeholder='Descripción del producto'
                value={producto.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className='talles-admin'>
              <span className='talle-seleccionado'>Stock:</span>
              <div className='talles-container-admin'>
                {['S', 'M', 'L', 'XL', 'XXL'].map((talle) => (
                  <Input
                    type='number'
                    label={talle}
                    value={producto.talles[talle]}
                    onChange={handleTalleChange}
                    min='0'
                    required
                    key={talle}
                  />
                ))}
              </div>
            </div>

            <Boton
              type='submit'
              textBoton='Agregar Producto'
            />
          </form>
        </section>
      </main>
    </>
  );
}
