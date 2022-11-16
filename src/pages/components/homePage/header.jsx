export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a className="btn btn-custom btn-lg intro-button" href={props.data ? props.data.introClassLink : ""} target="_blank">
                  Sign Up For Intro Class
                </a>
                <a className=" btn-custom btn-lg intro-button" href={props.data ? props.data.infoRequestLink : ""} target="_blank">
                  Want More Information?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
