import { NavLink } from "react-router-dom";

export const LoginComponent = (props) => {
    return (
      <div id='login' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="login-form">
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Don't have an account with us yet?</h1>
                            <p>Click the button below to go to the Sign Up page.</p>
                            <NavLink className="nav-link" to="/signup">
                              <button class="ghost" id="logIn">Sign Up</button>
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