import './DropDown.css';

export default function DropDown({ data, activeIndex, setActiveIndex }) {
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='dropdown-container'>
      {data.map((item, index) => (
        <div key={index}>
          <button
            className='dropdown-item'
            onClick={() => handleToggle(index)}
          >
            <div>
              {item.title}
              <i
                className={
                  activeIndex === index
                    ? 'bi bi-chevron-down'
                    : 'bi bi-chevron-right'
                }
              />
            </div>
          </button>
          <div
            className='dropdown-item-desc'
            style={{ display: activeIndex === index ? 'block' : 'none' }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
