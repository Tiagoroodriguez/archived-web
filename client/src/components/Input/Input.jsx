import './Input.css';

export default function Input({ type, label, value, ternaria }) {
  return (
    <div className='input-container'>
      <input
        autoComplete='off'
        required
        type={type}
        className='input'
        value={value}
        {...ternaria}
      />
      <label className='label'>{label}</label>
    </div>
  );
}
