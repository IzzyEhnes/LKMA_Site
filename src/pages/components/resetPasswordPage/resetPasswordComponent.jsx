import { NavLink } from "react-router-dom";

export const ResetPasswordComponent = (props) => {
    return (
      <div id='reset-password' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="reset-password-form">
                <div class="form-container submit-container">
                    <form action="#">
                        <h1>Reset Password</h1>
                        <input type="Password" placeholder="Password" />
                        <input type="Confirm Password" placeholder="Confirm Password" />
                        <button>Submit</button>
                    </form>
                </div>
                <div class="overlay-container">
                <div class="overlay">
                        <div class="overlay-panel overlay-right">
                          <img src="/img/resetpassword.jpg"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
  }