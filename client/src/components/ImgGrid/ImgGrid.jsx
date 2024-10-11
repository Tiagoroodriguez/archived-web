import './ImgGrid.css';
export default function ImgGrid() {
  return (
    <section className='section-img-grid'>
      <div className='img-grid-container'>
        <picture className='img-grid-item imgPanoramica'>
          <img
            src='/images/grid-img/img-grid-3.jpg'
            alt='Coleccion Casa de campo, remera x'
            loading='lazy'
          />
        </picture>
        <picture className='img-grid-item img1'>
          <img
            src='/images/grid-img/img-grid-2.jpg'
            alt='Coleccion Casa de campo, remera y'
            loading='lazy'
          />
        </picture>
        <picture className='img-grid-item img2'>
          <img
            src='/images/grid-img/img-grid-1.jpg'
            alt='Coleccion Casa de campo, remera z'
            loading='lazy'
          />
        </picture>
      </div>
    </section>
  );
}
