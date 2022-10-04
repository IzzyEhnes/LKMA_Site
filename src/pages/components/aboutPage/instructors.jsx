export const Instructors = (props) => {
  return (
    <div id='instructors' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Instructors</h2>
          <p>
            Head Masters at Lee's Korean Martial Arts in Rancho Cordova
          </p>
        </div>
        <div className='row'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4 instructor-item'>
                  <h3>{d.name}</h3>
                  <img src={d.img} alt='...' className='team-img instructor-img' />
                  <p className='instructor-paragraph'>{d.paragraph}</p>
                  <hr></hr>
                </div>
              ))
              : 'Loading...'}
        </div>
      </div>
    </div>
  )
}