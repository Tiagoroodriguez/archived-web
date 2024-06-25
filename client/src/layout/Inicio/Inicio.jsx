import Bento from '../../components/Bento/Bento';
import HeroSection from '../../components/HeroSection/HeroSection';
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
        <Bento />
        <Novedades
          cantidad='4'
          categoria='remera'
          titulo={'New in | T-Shirts & Tops'}
        />
      </main>
    </>
  );
}
