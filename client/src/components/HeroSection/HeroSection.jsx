import Contador from '../Contador/Contador';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className='hero-container'>
      <picture className='hero-img-container'>
        <img
          src='images/banner_pc.webp'
          alt='Banner de la colección Casa de Campo'
          className='hero-background hero-img-pc'
        />
        <img
          src='images/banner_celu.webp'
          alt='Banner de la colección Casa de Campo'
          className='hero-background hero-img-mobile'
        />
      </picture>
      {/*<div className='hero-content'>
        <div className='hero-contador'>
          <Contador targetDate='2024-10-13T21:00:00' />
        </div>
      </div>*/}
    </section>
  );
}
