export const FAQ = (props) => {
  return (
    <div id='faq' className='text-center'>
      <div className='container'>
        <div className='faq-title'>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className='row'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.question}-${i}`} className='col-sm-6 col-md-4 col-lg-4 faq-item'>
                  <div className="faq-question">
                    <div className="faq-question-q">
                      <h1>Q.</h1>
                    </div>
                    <div className="faq-question-text">
                      <h3>{d.question}</h3>
                    </div>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-a">
                      <h1>A.</h1>
                    </div>
                    <div className="faq-answer-text">
                      <p>{d.answer}</p>
                    </div>
                  </div>
                </div>
              ))
              : 'Loading...'}
        </div>
      </div>
    </div>
  )
}