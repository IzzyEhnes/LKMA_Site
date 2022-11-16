import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { Navigation } from './pages/components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TokenExpired from './pages/TokenExpired';
import ChangeEmail from './pages/ChangeEmail';
import Temp from './pages/Temp';
import Forgot from './pages/Forgot';
import Admin from './pages/Admin';
import AuthProvider from './AuthContext';
import * as serviceWorker from './serviceWorker';



function WithoutAuth({ children }) {
  var auth = localStorage.getItem("isAuth");

  if (auth) {
    return <Navigate to="/"/>;
  }
  return children;
}

function RequireAuth({ children }) {
  var auth = localStorage.getItem("isAuth");

  if (!auth) {
    return <Navigate to="/"/>;
  }
  return children;
}

function RequireStudentAuth({ children }) {
  var auth = localStorage.getItem("isAuth");
  var isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  if (!auth || isAdmin) {
    return <Navigate to="/"/>;
  }
  return children;
}

function RequireAdminAuth({ children }) {
  var auth = localStorage.getItem("isAuth");
  var isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  if (!auth || !isAdmin) {
    return <Navigate to="/"/>;
  }
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/signup" element={
            <WithoutAuth>
              <SignUp />
            </WithoutAuth>} 
          />
          <Route path="/login" element={
            <WithoutAuth>
              <Login />
            </WithoutAuth>} 
          />
          <Route path="/profile" element={
            <RequireStudentAuth>
              <Profile />
            </RequireStudentAuth>} 
          />
          <Route path="/resetpassword" element={
            <RequireAuth>
              <ResetPassword />
            </RequireAuth>} 
          />
          <Route path="/changeemail" element={
            <RequireAuth>
              <ChangeEmail />
            </RequireAuth>} 
          />
          {/*<Route path="/temp" element={<Temp />} />*/}
          <Route path="/forgot" element={
            <WithoutAuth>
              <Forgot />
            </WithoutAuth>} 
          />
          <Route path="/tokenexpired" element={
            <WithoutAuth>
              <TokenExpired />
            </WithoutAuth>} 
          />
          <Route path="/admin" element={
            <RequireAdminAuth>
              <Admin />
            </RequireAdminAuth>} 
          />
          <Route path="*" element={<Home />}/>  
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
