import './Slider.css';

export function Slider() {
  return (
    <section className='slider-section'>
      <div className='slider-container'>
        <div className='slider-frame'>
          <ul className='slider-list'>
            <li>
              <img
                src='/images/slider/scarface.webp'
                alt=''
              />
            </li>
            <li>
              <img
                src='/images/slider/NWA.webp'
                alt=''
              />
            </li>
            <li>
              <img
                src='/images/slider/jordan.webp'
                alt=''
              />
            </li>
            <li>
              <img
                src='/images/slider/eminem.webp'
                alt=''
              />
            </li>
            <li>
              <img
                src='/images/slider/scarface.webp'
                alt=''
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
