import { useState } from 'react';
import './Select.css';
// ... other imports ...

export default function Select({ labelText, value, onChange, texto, data }) {
  const [selectedProvincia, setSelectedProvincia] = useState('');

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
        value={selectedProvincia}
        onChange={(event) => {
          setSelectedProvincia(event.target.value);
          onChange(event.target.value); // Pass the selected value to the parent component
        }}
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
