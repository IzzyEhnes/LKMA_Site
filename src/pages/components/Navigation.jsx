import { Navigate, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { resetTempImage } from "./profilePage/profileComponent";
import { resetRender } from "./adminPage/adminComponent";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import axios from "axios";

var adminCheck;

export const AuthLogOut = () => {
  const { setAuth } = useAuth();
  setAuth(false);
}

export const Navigation = (props) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [renderPage, setRenderPage] = useState();

  const resetChooseFile = () => {
    resetTempImage();
  }

  const resetAdmin = () => {
    resetRender();
  }

  useEffect(() => {
    const determineAdmin = async () => {
      const tokenData = new FormData();
      tokenData.append("jwt", localStorage.getItem("token"));

      await axios.post("http://localhost:3001/retrieveUserInfo", tokenData).then((response) => {
        if (response.data.result[0] !== undefined) {
          if (response.data.result[0].admin_status == 1) {
            adminCheck = true;
            navigate("/admin");
          } else {
            adminCheck = false;
            navigate("/profile");
          }
        }
      });
      
      return adminCheck;
    }

    adminCheck = determineAdmin();
  }, []);

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
            {localStorage.getItem("token") ? ((adminCheck) ? (
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
                  Student
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

            {!localStorage.getItem("token") ? (<li>
              <NavLink className="nav-link" to="/login" onClick={() => {
                resetChooseFile();
                resetAdmin();
                setRenderPage(Math.random());
              }}>
                Login
              </NavLink>
            </li>
            ) : (null)}
          </ul>
        </div>
      </div>
    </nav>
  )
}
