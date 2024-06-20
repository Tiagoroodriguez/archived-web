import { useState } from 'react';
import './Input.css';

export default function Input({ type, label, ternaria }) {
  const [hasContent, setHasContent] = useState(false);

  const handleInputChange = (e) => {
    setHasContent(e.target.value !== '');
  };

  return (
    <div className='input-container'>
      <input
        type={type}
        name={label}
        className={`input ${hasContent ? 'filled' : ''}`}
        {...ternaria}
        onChange={handleInputChange}
      />
      <label
        htmlFor={label}
        className='label'
      >
        {label}
      </label>
    </div>
  );
}
