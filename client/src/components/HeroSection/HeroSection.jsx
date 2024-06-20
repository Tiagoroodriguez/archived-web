import { Boton } from '../Boton/Boton';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className='hero-container'>
      <img
        src='images/hero.jpg'
        alt='hero'
        className='hero-background'
      />
      <img
        src='images/hero.jpg'
        alt='hero'
        className='hero-background hero-blur'
      />
      <div className='hero-content'>
        <h1>Discover the Limited Collection of Urban Elegance</h1>
        <h2>Each piece is unique. Once it's gone, it’s gone forever.</h2>
        <div className='hero-btn-container'>
          <Boton textBoton='Explore the Collection' />
        </div>

        <div className='hero-contador'>
          <span>Next Drop In: </span>
          <span className='timer'>05 Days 12 Hours 30 Minutes</span>
        </div>
      </div>
    </div>
  );
}
