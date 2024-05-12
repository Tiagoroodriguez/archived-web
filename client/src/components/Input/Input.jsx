import './Input.css';

export default function Input({ type, label, ternaria }) {
  return (
    <div className='input-container'>
      <input
        autoComplete='off'
        required
        type={type}
        className='input'
        {...ternaria}
      />
      <label className='label'>{label}</label>
    </div>
  );
}
