import './CheckboxGroup.css';

export function CheckboxGroup({ options, selectedOption, onSelectionChange }) {
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
              checked={selectedOption === option} // Usar el valor proporcionado por las props
              onChange={() => onSelectionChange(option)} // Llamar a onChange proporcionado por las props
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
