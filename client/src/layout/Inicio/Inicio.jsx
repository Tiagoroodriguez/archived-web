import { InformacionEnvios } from '../../components/InformacionEnvios/InformacionEnvios';
import { Slider } from '../../components/Slider/Slider';

import { Nosotros } from '../../components/Nosotros/Nosotros';
import { useAuth } from '../../context/AuthContext';

export function Inicio() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <main>
        <Slider />
        <Nosotros />
        <InformacionEnvios />
      </main>
    </>
  );
}
