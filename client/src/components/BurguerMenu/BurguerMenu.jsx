import './BurguerMenu.css';

export default function BurguerMenu({ onClick }) {
  return (
    <>
      <input
        id='burger-checkbox'
        type='checkbox'
        onClick={onClick}
      />
      <label
        className='burger'
        htmlFor='burger-checkbox'
        onClick={onClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </label>
    </>
  );
}
