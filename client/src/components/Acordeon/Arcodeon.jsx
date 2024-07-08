import './Acordeon.css';
import { useRef, useEffect } from 'react';

export default function Acordeon({ data, activeIndex, setActiveIndex }) {
  const contentRef = useRef([]);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRef.current.forEach((content, index, icon) => {
      if (content) {
        content.style.maxHeight =
          activeIndex === index ? `${content.scrollHeight}px` : '0px';
      }
    });
  }, [activeIndex]);

  return (
    <div className='acordeon-container'>
      {data.map((item, index) => (
        <div key={index}>
          <button
            className='acordeon-item'
            onClick={() => handleToggle(index)}
          >
            <div>
              <p>
                <i className={item.icon} /> {item.title}
              </p>
              <i
                className={activeIndex === index ? 'bi bi-dash' : 'bi bi-plus'}
              />
            </div>
          </button>
          <div
            ref={(el) => (contentRef.current[index] = el)}
            className='acordeon-item-desc'
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
