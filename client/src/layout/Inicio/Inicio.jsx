import { useEffect, useState } from 'react';
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
        <title>Archived</title>
        <meta
          name='description'
          content='Inicio de la web oficial de Archived'
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
