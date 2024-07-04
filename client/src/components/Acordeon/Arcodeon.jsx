import './Acordeon.css';
import { useRef, useEffect } from 'react';

export default function Acordeon({ data, activeIndex, setActiveIndex }) {
  const contentRef = useRef([]);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRef.current.forEach((content, index) => {
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
