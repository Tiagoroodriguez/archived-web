import Contador from '../Contador/Contador';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className='hero-container'>
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
          <h1>Casa de Campo</h1>
          <h2>Coleccion exclusiva 22-09-2024</h2>
        </div>

        <div className='hero-contador'>
          <Contador targetDate='2024-09-22T23:59:59' />
        </div>
      </div>
    </section>
  );
}
