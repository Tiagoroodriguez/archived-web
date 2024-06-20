import { Boton } from '../Boton/Boton';
import Contador from '../Contador/Contador';
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
          <button className='hero-btn'>Quienes somos?</button>
        </div>

        <div className='hero-contador'>
          <span>Next Drop In: </span>
          <Contador targetDate='2024-12-31T23:59:59' />
        </div>
      </div>
    </div>
  );
}
