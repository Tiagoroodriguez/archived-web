import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { getSuscriptoresRequest } from '../../api/subscriber';

export default function AdminNewsletter() {
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
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
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
  const [initaliLoad, setInitialLoad] = useState(true);
  const [suscriptores, setSuscriptores] = useState([]);
  const handleDescripcionChange = (content) => {
    setDescripcion(content);
  };

  useEffect(() => {
    if (initaliLoad) {
      setInitialLoad(false);
      const FechtSubscribe = async () => {
        try {
          const response = await getSuscriptoresRequest();

          setSuscriptores(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      FechtSubscribe();
    }
  }, [initaliLoad, suscriptores]);

  return (
    <div className='admin-newsletter'>
      <h3>NewSletter</h3>

      <section>
        <h2>Crear Newsletter</h2>
        <form>
          <label htmlFor='titulo'>Titulo</label>
          <input
            type='text'
            id='titulo'
            name='titulo'
          />
          <label htmlFor='descripcion'>Descripcion</label>
          <ReactQuill
            value={descripcion}
            onChange={handleDescripcionChange}
            modules={modules}
            formats={formats}
          />

          <button type='submit'>Crear</button>
        </form>
      </section>
      <section>
        <h2>Lista de suscriptores</h2>
        <ul>
          {suscriptores.map((suscriptor) => (
            <li key={suscriptor._id}>
              <p>{suscriptor.email}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
