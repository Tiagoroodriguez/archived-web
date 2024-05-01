import './Input.css';

export default function Input({ type, placeholder, label, ternaria }) {
  return (
    <>
      <label className='label'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className='input'
        {...ternaria}
      />
    </>
  );
}
