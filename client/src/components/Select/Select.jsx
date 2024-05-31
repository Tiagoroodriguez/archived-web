import './Select.css';

export default function Select({
  labelText,
  value,
  onChange,
  texto,
  data,
  ternaria,
}) {
  return (
    <div className='select-container'>
      <label
        htmlFor='cars'
        className='select-label'
      >
        {labelText}
      </label>
      <select
        className='select-input'
        name={labelText.toLowerCase()}
        id={labelText.toLowerCase()}
        value={value}
        onChange={onChange}
        {...ternaria}
      >
        <option
          className='select-option'
          value=''
        >
          {texto}
        </option>
        {data.map((data) => (
          <option
            className='select-option'
            key={data.id}
            value={data.nombre}
          >
            {data.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
