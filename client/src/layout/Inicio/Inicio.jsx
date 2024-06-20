import Bento from '../../components/Bento/Bento';
import HeroSection from '../../components/HeroSection/HeroSection';
import { Novedades } from '../../components/Novedades/Novedades';
//import { Slider } from '../../components/Slider/Slider';
import { useAuth } from '../../context/AuthContext';

export function Inicio() {
  const { user } = useAuth();
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
