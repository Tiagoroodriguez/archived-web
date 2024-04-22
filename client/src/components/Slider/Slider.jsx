import './Slider.css';

export function Slider() {
  return (
    <section className='slider-section'>
      <div className='slider-container'>
        <div className='slider-frame'>
          <div className='slider-text'>
            <h1>Archived 222</h1>
            <p>Nosomos solo una marca, somos un movimiento</p>
          </div>

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
        <div className='slider-frame blur'>
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
