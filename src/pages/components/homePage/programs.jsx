import { Program_Image } from "./image";

export const Programs = (props) => {
  return (
    <div id='programs' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Our Programs</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className='row'>
            {props.data
              ? props.data.map((d, i) => (
                  <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                    <h3>{d.title}</h3>
                    <Program_Image title='Learn More' largeImage={d.largeImage} smallImage={d.smallImage} />
                  </div>
                ))
              : 'loading'}
        </div>
      </div>
    </div>
  )
}