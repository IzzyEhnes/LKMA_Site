export const Location = (props) => {
    return (
      <div id="location" className='text-center'>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="section-title">                
                <h2>Connect with Us</h2>
                <h3>Address:</h3>
                <p className="address">{props.data ? props.data.address : "loading..."}</p>
                <h3>Contact Info:</h3>     
                <p className="contact">{props.data ? props.data.contact : "loading..."}</p>    
                <div className="col-xs-12 col-md-6">
                  <h3 className="follow-us">Follow us on:</h3>
                </div>
                <div className="col-xs-12 col-md-6">
                  <a className="twitter" href="https://twitter.com/SacMartialArts">
                    <img src="img/twitter.png" width="30" height="30" alt="" />
                  </a>
                  <a className="facebook" href="https://www.facebook.com/LeesKoreanMartialArts">
                    <img src="img/facebook.png" width="30" height="30" alt="" />
                  </a>
                </div>
              </div> 
            </div>
            <div className="col-xs-12 col-md-6">
              <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1700.2619051841255!2d-121.2883490694468!3d38.59610241301258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809add1319d09b31%3A0x3908c8dcd638270d!2s2801%20Zinfandel%20Dr%2C%20Rancho%20Cordova%2C%20CA%2095670!5e0!3m2!1sen!2sus!4v1650759149021!5m2!1sen!2sus"
                width="400" height="400" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    );
  };
  