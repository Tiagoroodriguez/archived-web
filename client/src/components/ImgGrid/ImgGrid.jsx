import './ImgGrid.css';
export default function ImgGrid() {
  return (
    <section className='section-img-grid'>
      <div className='img-grid-container'>
        <picture className='img-grid-item imgPanoramica'>
          <img src='/images/grid-img/img-grid-3.jpg' />
        </picture>
        <picture className='img-grid-item img1'>
          <img src='/images/grid-img/img-grid-2.jpg' />
        </picture>
        <picture className='img-grid-item img2'>
          <img src='/images/grid-img/img-grid-1.jpg' />
        </picture>
      </div>
    </section>
  );
}
