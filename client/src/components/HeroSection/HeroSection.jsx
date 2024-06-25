import Contador from '../Contador/Contador';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className='hero-container'>
      <picture className='hero-img-container'>
        <img
          src='images/hero.jpg'
          alt='hero'
          className='hero-background'
        />
      </picture>

      {/*<img
        src='images/hero.jpg'
        alt='hero'
        className='hero-background hero-blur'
      />*/}
      <div className='hero-content'>
        <div className='hero-text'>
          <h1>ARCHIVED 222</h1>
          <h2>Nueva coleccion el 13/05/2025</h2>
        </div>

        <div className='hero-contador'>
          <Contador targetDate='2024-12-31T23:59:59' />
        </div>
      </div>
    </div>
  );
}
