import Bento from '../../components/Bento/Bento';
import { InformacionEnvios } from '../../components/InformacionEnvios/InformacionEnvios';
import { Novedades } from '../../components/Novedades/Novedades';
import { Slider } from '../../components/Slider/Slider';
import { useAuth } from '../../context/AuthContext';

export function Inicio() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <main>
        <Slider />
        <Novedades />
        <Bento />
        <Novedades />
        <InformacionEnvios />
      </main>
    </>
  );
}
