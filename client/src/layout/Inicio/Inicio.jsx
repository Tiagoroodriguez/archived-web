import HeroSection from '../../components/HeroSection/HeroSection';
import ImgGrid from '../../components/ImgGrid/ImgGrid';
import MySlider from '../../components/MySlider/MySlider';
import { Novedades } from '../../components/Novedades/Novedades';

export function Inicio() {
  return (
    <>
      <main>
        <HeroSection />
        <Novedades
          cantidad='4'
          categoria='buzo'
          titulo={'New in | Hoodies & Sweatshirts'}
        />
        <ImgGrid />
        <Novedades
          cantidad='4'
          categoria='remera'
          titulo={'New in | T-Shirts & Tops'}
        />
        <MySlider />
      </main>
    </>
  );
}
