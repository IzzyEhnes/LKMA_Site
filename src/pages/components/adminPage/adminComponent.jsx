import { NavLink } from "react-router-dom";

export const AdminComponent = (props) => {
  return (
    <div id='admin' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Admin</h2>
        </div>
        <div className='row'>
          <h1>Display Admin Account Details Below</h1>
          <div className="column">
            <h1>First Name</h1>
            <h1>Last Name</h1>
          </div>
          <div className="column">
            <h1>Email Here</h1>
          </div>
        </div>
        <div className='row'>
          <div className="column">
              <NavLink to="/changeemail">
                <button type="button">
                  Change Email
                </button>
              </NavLink>
              
          </div>
          <div className="column">
            <button>Change Password</button>
          </div>
        </div>
        <div className='row'>
          <button>See Student Info</button>
        </div>
      </div>
    </div>
  )
}
