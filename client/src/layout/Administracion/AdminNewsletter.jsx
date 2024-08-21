import { useState } from 'react';
import ReactQuill from 'react-quill';

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
  const handleDescripcionChange = (content) => {
    setDescripcion(content);
  };
  return (
    <div className='admin-newsletter'>
      <h1>NewSletter</h1>
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
    </div>
  );
}
