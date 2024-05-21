import { useState } from 'react';
import './CheckboxGroup.css';

export function CheckboxGroup({ options, onSelectionChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onSelectionChange) {
      onSelectionChange(option);
    }
  };

  return (
    <div className='checkboxgroup-container'>
      {options.map((option, index) => (
        <div
          key={index}
          className='checkboxgroup-item'
        >
          <label>
            <input
              type='checkbox'
              checked={selectedOption === option}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
