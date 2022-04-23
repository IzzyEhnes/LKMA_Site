export const Location = (props) => {
    return (
      <div id="location" className='text-center'>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="section-title">
              {" "}
                
                <h2>Connect with Us</h2>
                <p className="address">{props.data ? props.data.address : "loading..."}</p>{" "}     
                <p className="contact">{props.data ? props.data.contact : "loading..."}</p>{" "}     
                <p>Include bubbles for social media accounts: facebook, twitter</p>
                <p>testing 2</p>
              </div> 
            </div>
            <div className="col-xs-12 col-md-6">
              <iframe id="border" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.949250545
                0603!2d-121.31286974897145!3d38.58101647303577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.
                1!3m3!1m2!1s0x809adcbe7d48fc13%3A0xf5bc59fc2a2fde7a!2sLee&#39;s%20Korean%20Martial%20
                Arts!5e0!3m2!1sen!2sus!4v1650498933705!5m2!1sen!2sus" width="530" height="400" 
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    );
  };
  