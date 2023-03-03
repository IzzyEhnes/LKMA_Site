import { NavLink } from "react-router-dom";
import React from "react";
import "./Navigation.css";

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

          <NavLink className='nav-link navbar-brand page-scroll' to="/" onClick={() => {
          }}>
            <img src='/img/logo.png' width="50" height="50" />
            <span className="lg-view">Lee's Korean Martial Arts</span>
            <span className="sm-view">LKMA</span>
          </NavLink>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
          <li>
              <NavLink className="nav-link" to="/" onClick={() => {
              }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about" onClick={() => {
              }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/faq" onClick={() => {
              }}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/programs" onClick={() => {
              }}>
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/gallery" onClick={() => {
              }}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/calendar" onClick={() => {
              }}>
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact" onClick={() => {
              }}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
