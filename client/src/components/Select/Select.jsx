import './Select.css';

export default function Select({ labelText, value, onChange, texto, data }) {
  return (
    <div className='select-container'>
      <label
        htmlFor={labelText.toLowerCase()}
        className='select-label'
      >
        {labelText}
      </label>
      <select
        className='select-input'
        name={labelText.toLowerCase()}
        id={labelText.toLowerCase()}
        value={value} // Usar el valor proporcionado por las props
        onChange={(event) => onChange(event.target.value)} // Llamar a onChange proporcionado por las props
      >
        <option
          className='select-option'
          value=''
        >
          {texto}
        </option>
        {data.map((dataItem) => (
          <option
            className='select-option'
            key={dataItem.id}
            value={dataItem.nombre}
          >
            {dataItem.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
