import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { resetTempImage } from "./profilePage/profileComponent";
import { resetRender } from "./adminPage/adminComponent";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";

export const AuthLogOut = () => {
  const { setAuth } = useAuth();
  setAuth(false);
}

export const Navigation = (props) => {
  const { setAuth } = useAuth();
  const [renderPage, setRenderPage] = useState();

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
            setRenderPage(Math.random());
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
                setRenderPage(Math.random());
              }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/faq" onClick={() => {
                resetChooseFile();
                resetAdmin();
                setRenderPage(Math.random());
              }}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/programs" onClick={() => {
                resetChooseFile();
                resetAdmin();
                setRenderPage(Math.random());
              }}>
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/gallery" onClick={() => {
                resetChooseFile();
                resetAdmin();
                setRenderPage(Math.random());
              }}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/calendar" onClick={() => {
                resetChooseFile();
                resetAdmin();
                setRenderPage(Math.random());
              }}>
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact" onClick={() => {
                resetChooseFile();
                resetAdmin();
                setRenderPage(Math.random());
              }}>
                Contact
              </NavLink>
            </li>
            {}
            {/*storageDataFile? (<img data-testid="profilePic" src={storageDataFile} />) : (<img data-testid="profilePic" src={imageFilePath} />) */}
            {localStorage.getItem("isAuth")? (JSON.parse(localStorage.getItem("isAdmin"))? (
              <li>
                <NavLink className="nav-link" to="/admin" onClick={() => {
                  resetChooseFile();
                  setRenderPage(Math.random());
                }}>
                  Admin
                </NavLink>
              </li>) : (
              <li>
                <NavLink className="nav-link" to="/profile" onClick={() => {
                  resetAdmin();
                  setRenderPage(Math.random());
                  
                }}>
                  {(JSON.parse(localStorage.getItem("user"))).firstName + " " 
                    + (JSON.parse(localStorage.getItem("user"))).lastName}
                  {/*<img className="navbarPic borderRadius" style={{borderRadius: '5px', overflow: 'hidden'}} src={filePath} alt=""/>*/}
                </NavLink>
              </li>)) 
            : (<li>
                <NavLink className="nav-link" to="/signup" onClick={() => {
                  resetChooseFile();
                  resetAdmin();
                  setRenderPage(Math.random());
                }}>
                  Sign Up
                </NavLink>
                </li>
              )}

            {!localStorage.getItem("isAuth")? (<li>
                <NavLink className="nav-link" to="/login" onClick={() => {
                  resetChooseFile();
                  resetAdmin();
                  setRenderPage(Math.random());
                }}>
                  Login
                </NavLink>
              </li>
              ) : (null)}
            
            {/*<li>
              <NavLink className="nav-link" to="/temp" onClick={() => {
                resetChooseFile();
                resetAdmin();
              }}>
                Temp
              </NavLink>
            </li>*/}
            
          </ul>
        </div>
      </div>
    </nav>
  )
}
