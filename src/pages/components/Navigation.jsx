import React from "react";
import { NavLink } from "react-router-dom";
import { resetTempImage } from "./profilePage/profileComponent";
import { resetRender } from "./adminPage/adminComponent";

export const Navigation = (props) => {

  const resetChooseFile = () => {
    resetTempImage();
  }

  const resetAdmin = () => {
    resetRender();
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
            resetAdmin();
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
                resetAdmin();
              }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/faq" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/programs" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/gallery" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/calendar" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile" onClick={() => {
                resetAdmin();
              }}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/signup" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/temp" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Temp
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/admin" onClick={() => {
                resetChooseFile();
              }}>
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
