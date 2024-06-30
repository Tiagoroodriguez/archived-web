import { useState, useEffect } from 'react';
import './Input.css';

export default function Input({ type, label, ternaria, value }) {
  const [inputValue, setInputValue] = useState(value || '');
  const [hasContent, setHasContent] = useState(!!value);

  useEffect(() => {
    setInputValue(value || '');
    setHasContent(!!value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHasContent(newValue !== '');
  };

  return (
    <div className='input-container'>
      <input
        autoComplete='on'
        type={type}
        name={label}
        className={`input ${hasContent ? 'filled' : ''}`}
        {...ternaria}
        value={inputValue}
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
