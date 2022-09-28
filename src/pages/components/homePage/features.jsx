import { NavLink } from "react-router-dom";

export const Features = (props) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          <h2>Features</h2>
        </div>
        <div className='row'>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                  {' '}

                  <i className={d.icon}></i>
                  <h3>
                    <NavLink className="nav-link btn btn-custom btn-lg" to={d.ref}>
                      {d.title}
                    </NavLink>
                  </h3>{' '}{' '}

                  <p>{d.text}</p>
                  
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  )
}
