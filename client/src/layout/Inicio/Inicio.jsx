import HeroSection from '../../components/HeroSection/HeroSection';
import ImgGrid from '../../components/ImgGrid/ImgGrid';
//import MySlider from '../../components/MySlider/MySlider';
import Newsletter from '../../components/Newsletter/Newsletter';
import { Novedades } from '../../components/Novedades/Novedades';
import { Helmet } from 'react-helmet';

export function Inicio() {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Archived | STREETWEAR CLOTHING</title>
        <meta
          name='description'
          content='Creemos en la creación de una comunidad unida por el amor a la moda y la exclusividad. Nuestra misión es ir más allá de la simple confección de ropa; buscamos construir una familia con nuestros clientes, donde cada prenda no solo se convierte en una expresión de estilo, sino también en un símbolo de pertenencia a algo único y especial.'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/'
        />
      </Helmet>
      <Newsletter />
      <main>
        <HeroSection />
        <Novedades
          cantidad='4'
          coleccion='Casa de campo'
          titulo={'Nueva colección | Casa de campo'}
        />
        <ImgGrid />

        {/*<Novedades
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
        <MySlider />*/}
      </main>
    </>
  );
}
