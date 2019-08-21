import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './base-component/Home';
import { UserContextConsumer } from './User/User.contenxt';
import UserHome from './User/Home';

export default class App extends Component {

  render() {
    return (
      <React.Fragment>
        <UserContextConsumer>
          {UserContext => {
            if(!UserContext.isUserLoad){
              if(window.localStorage.getItem('userId') === null ) {
                UserContext.LoginUser()
                console.log('login user call')
              }
              else{
                UserContext.userbooks(window.localStorage.getItem('userId'))
                console.log('users book call')
              }
            }
            console.log(UserContext.user)
            console.log(window.localStorage.getItem('userId'))
            return (
              <Router>
                <React.Fragment>
                  <Route exact path="/" component={Home} />
                  {
                    UserContext.user === null ? " " :  <Route path={`/${UserContext.user.firstName}-book`} component={UserHome} />
                  }
                </React.Fragment>
              </Router>
            )
          }}
        </UserContextConsumer>
      </React.Fragment>
    );
  }
}

