import './Acordeon.css';

export default function Acordeon({ data, activeIndex, setActiveIndex }) {
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='acordeon-container'>
      {data.map((item, index) => (
        <div key={index}>
          <button
            className='acordeon-item'
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
            className='acordeon-item-desc'
            style={{ display: activeIndex === index ? 'block' : 'none' }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
