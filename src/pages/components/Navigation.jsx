import React from "react";
import { NavLink } from "react-router-dom";
import { resetTempImage } from "./profilePage/profileComponent";

export const Navigation = (props) => {

  const resetChooseFile = () => {
    resetTempImage();
  }

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

          <NavLink className='nav-link navbar-brand page-scroll' to="/" onClick={() => {
            resetChooseFile();
          }}>
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
              <NavLink className="nav-link" to="/about" onClick={() => {
                resetChooseFile();
              }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/faq" onClick={() => {
                resetChooseFile();
              }}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/programs" onClick={() => {
                resetChooseFile();
              }}>
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/gallery" onClick={() => {
                resetChooseFile();
              }}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/calendar" onClick={() => {
                resetChooseFile();
              }}>
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact" onClick={() => {
                resetChooseFile();
              }}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/signup" onClick={() => {
                resetChooseFile();
              }}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login" onClick={() => {
                resetChooseFile();
              }}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/temp">
                Temp
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
