import Bento from '../../components/Bento/Bento';
import { Novedades } from '../../components/Novedades/Novedades';
import { Slider } from '../../components/Slider/Slider';
import { useAuth } from '../../context/AuthContext';

export function Inicio() {
  const { user } = useAuth();
  return (
    <>
      <main>
        <Slider />
        <Novedades
          categoria='remera'
          cantidad='4'
          titulo={'Conoce nuestro ultimo drop'}
        />
        <Bento />
        <Novedades
          categoria='remera'
          cantidad='4'
          titulo={'Remeras | Archived 222'}
        />
      </main>
    </>
  );
}
