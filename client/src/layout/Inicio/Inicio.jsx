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
          titulo={'Buzos | Archived 222'}
        />
        <Bento />
        <Novedades
          cantidad='4'
          categoria='remera'
          titulo={'Remeras | Archived 222'}
        />
      </main>
    </>
  );
}
