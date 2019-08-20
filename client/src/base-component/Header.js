import React, { Component } from "react";
import {NavLink} from 'react-router-dom'
import Sidebar from './Sidebar'
import { UserContextConsumer } from "../User/User.contenxt";

export default class Header extends Component {

  state={
    isUser: true
  }
  render() {
    return (
      <React.Fragment>

        <header>
          {/* navbar here */}
          <nav className="navbar fixed-top navbar-expand-lg scrolling-navbar">
            <div className="container">
              {/* <!-- Brand --> */}
              <NavLink
                className="navbar-brand waves-effect"
                to="/"
              >
                <strong className="blue-text">Developer World</strong>
              </NavLink>

              {/* <!-- Collapse --> */}
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              {/* <!-- NavLinks --> */}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* <!-- Left --> */}
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item active">
                    <NavLink className="nav-NavLink waves-effect white-text" to="/dev">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-NavLink waves-effect white-text"
                      to="/dev/reactjs"
                    >
                      Front-End
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-NavLink waves-effect white-text"
                      to="/dev/back-end"
                    >
                      Back-End
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className="nav-NavLink waves-effect"
                      href="https://mdbootstrap.com/education/bootstrap/"
                      target="_blank"
                    >
                      Free tutorials
                    </a>
                  </li> */}
                </ul>

                {/* <!-- Right --> */}
                <ul className="navbar-nav nav-flex-icons">
                  <li className="nav-item">
                    <NavLink
                    data-toggle="modal" data-target="#loginModalForm"
                      to="/login"
                      className="btn btn-dark px-4 py-2 waves-effect m-0"
                    >
                      <i className="fab fa-sith mr-2" />Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/*end navbar here */}

          {/* sidebar */}
          <Sidebar />
        </header>
       
      </React.Fragment>
    );
  }
}
