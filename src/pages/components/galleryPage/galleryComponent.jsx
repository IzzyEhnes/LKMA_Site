export const GalleryComponent = (props) => {
  return (
    <div id='gallerypage' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Gallery</h2>
        </div>
        <div className='row'>
          <div className='gallery-items'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                  <Gallery_Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}

const Gallery_Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className='gallery-item'>
      <div className='hover-bg'>
        {' '}
        <a
          href={largeImage}
          title={title}
          data-lightbox-gallery='gallery1'
        >
          <img
            src={smallImage}
            className='img-responsive'
            alt={title}
          />{' '}
        </a>{' '}
      </div>
    </div>
  )
}