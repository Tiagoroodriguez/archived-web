import './Nosotros.css';

export function Nosotros() {
  return (
    <section className='nosotros-section'>
      <div className='informacion-container'>
        <p className='informacion-principal'>
          ARCHIVED ® ES UNA MARCA DE ROPA URBANA PREMIUM FUNDADA EN UN PEQUEÑO
          DORMITORIO POR DOS COLEGAS CON MUCHAS GANAS DE CREAR ALGO DIFERENTE.
        </p>
        <p className='informacion-secundaria'>
          Nos esforzamos por crear diseños que cuenten con una actitud moderna
          para una vida llena de creatividad, mezclando de manera natural la
          comodidad, el minimalismo y la elegancia en cada diseño. Somos mucho
          más que simples prendas de vestir.
        </p>
        <p className='informacion-secundaria'>
          Nude es una plataforma creativa para aquellos que se sienten
          diferentes, incomprendidos o espíritus libres, para que puedan
          expresarse a su manera.
        </p>
        <p className='informacion-secundaria'>
          Nuestras prendas buscan inspirar a las nuevas generaciones a seguir su
          pasión, de la manera que elijan, empoderandolas para crear sin temor
          al juicio de los demás.
        </p>
      </div>
      <div className='container-img'>
        <img src='/images/doku-europe-finesse-records-3.jpg' />
      </div>
    </section>
  );
}
