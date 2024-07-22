import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';

export default function AdminProductos() {
  const { user } = useAuth();

  const [categoria, setCategoria] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchPedidos = async () => {
        if (user.rol != 'admin') {
          navigate('/');
        }
      };
      fetchPedidos();
    }
  }, [user]);

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
    <main className='admin-productos'>
      <h1>Administracion de productos</h1>
      <form className='admin-add-producto'>
        <h2>Agregar producto</h2>
        <div className='producto-info-container'>
          {' '}
          <div className='producto-input-container'>
            <h3>Descripcion</h3>
            <Input
              label='Nombre'
              type='text'
            />
            <Input
              label='Precio'
              type='number'
            />
            <Input
              label='Descripcion'
              type='text'
            />
            <Select
              labelText='Categoria'
              value={categoria}
              onChange={handleEstadoChange}
              texto='Selecciona una categoria'
              data={categorias}
            />
          </div>
          <div className='producto-input-container'>
            <h3>Stock</h3>
            <Input
              label='Cantidad S'
              type='text'
            />
            <Input
              label='Cantidad M'
              type='text'
            />
            <Input
              label='Cantidad L'
              type='text'
            />
            <Input
              label='Cantidad XL'
              type='text'
            />
          </div>
        </div>
      </form>
    </main>
  );
}
