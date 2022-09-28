import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
        
      <div className='container'>
        <div className='navbar-header'>

          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>

          <NavLink className='nav-link navbar-brand page-scroll' to="/">
          <img src='/img/logo.png' width="50" height="50" />
          Lee's Korean Martial Arts
          </NavLink>{' '}

        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/faq">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/programs">
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/calendar">
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
