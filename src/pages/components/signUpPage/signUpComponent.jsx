import { NavLink } from "react-router-dom";

export const SignUpComponent = (props) => {
    return (
      <div id='sign-up' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="sign-up-form">
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Already have an account?</h1>
                            <p>Click the button below to go to the Login page and sign in to an existing account.</p>
                            <NavLink className="nav-link" to="/login">
                              <button class="ghost" id="logIn">Login</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
  }