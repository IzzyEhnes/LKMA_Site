export const TokenExpiredComponent = (props) => {
    return (
      <div id='admin' className='text-center'>
        <div className='container'>
          <div className='section-title'>
            <h2>Oops! This password reset link has expired.</h2>
          </div>
          <div className='row'>
            <h1>Please go to the <a href="/forgot">Forgot Password</a> page again to receive a new link.</h1>
          </div>
        </div>
      </div>
    )
  }