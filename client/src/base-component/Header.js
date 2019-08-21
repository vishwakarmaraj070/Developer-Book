import React, { Component } from "react";
import {NavLink} from 'react-router-dom'


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
              <div onClick={(e)=>{
                    this.props.isNotHome()
                  }}>
              <NavLink
                className="navbar-brand waves-effect"
                to="/dev"
              >
                <strong className="blue-text">Developer World</strong>
              </NavLink>
              </div>

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
                  <li className="nav-item mx-3" onClick={(e)=>{
                    this.props.isNotHome()
                  }}>
                    <NavLink
                      className="nav-NavLink waves-effect white-text"
                      to="/dev/Front-End"
                    >
                      Front-End
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3" onClick={(e)=>{
                    this.props.isNotHome()
                  }}>
                    <NavLink
                      className="nav-NavLink waves-effect white-text"
                      to="/dev/Back-End"
                    >
                      Back-End
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3" onClick={(e)=>{
                    this.props.isNotHome()
                  }}>
                    <NavLink
                      className="nav-NavLink waves-effect white-text"
                      to="/dev/Database"
                    >
                      Database
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3" onClick={(e)=>{
                    this.props.isNotHome()
                  }}>
                    <NavLink
                      className="nav-NavLink waves-effect white-text"
                      to="/dev/Cloud"
                    >
                      Cloud
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
                      <i className="fa fa-sign-in-alt mr-2" />Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/*end navbar here */}

          {/* sidebar */}
          {/* <Sidebar /> */}
        </header>
       
      </React.Fragment>
    );
  }
}
