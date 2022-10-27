export const ContactComponent = (props) => {
  return (

    <div id='contact' className='text-center'>
      <div className='container'>
        <div className='contact-title'>
          <h2>Contact Us</h2>
        </div>

        <div className="schoolFront">
            <img src="img/leeskoreanmartialarts_sacramento.jpg" />
          </div>

        <div className='location'>
          <h4>Address:</h4>
          <h1> 
            {props.data ? props.data.address : "loading..."}
          </h1>
        </div>

        <hr></hr>
        <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1700.2619051841255!2d-121.2883490694468!3d38.59610241301258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809add1319d09b31%3A0x3908c8dcd638270d!2s2801%20Zinfandel%20Dr%2C%20Rancho%20Cordova%2C%20CA%2095670!5e0!3m2!1sen!2sus!4v1650759149021!5m2!1sen!2sus" 
          width="100%" height="450" allowFullScreen="" loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        <hr></hr>
        <div className='contact'>
          <h4>Call or Email:</h4>
          <h1> 
           {props.data ? props.data.contact.phone : "loading..."}
          </h1>
          <h1> 
            {props.data ? props.data.contact.email : "loading..."}
          </h1>
        </div>
        <hr></hr>
        <div className='row'>
          <h3>
            Have any questions or comments?
            <br></br>
            <br></br>
            You can get in touch with us by filling out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSfYlRNzFTCSV5Tq9460DD0JgHMLXI4s1GEGs_oQnghPRGUB2A/viewform" target="_blank">Information Request Form</a>.
          </h3>
        </div>
        <div className="col-xs-12 col-md-6">
         <h3 className="follow-us">Follow us on:</h3>
        </div>
      </div>

            <div className="twitter" href="https://twitter.com/SacMartialArts">
              <img src="img/twitter.png" width="30" height="30" alt=""/>
            </div>
              <div className="facebook" href="https://www.facebook.com/LeesKoreanMartialArts">
                <img src="img/facebook.png" width="30" height="30" alt=""/>
              </div>

    </div> 
  )
}