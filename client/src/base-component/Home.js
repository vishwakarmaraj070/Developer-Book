import React, { Component } from 'react'
import Login from './Login';
import SingIn from './Sing-in';
import { UserContextConsumer } from '../User/User.contenxt';
import Header from './Header';
import Footer from './Footer';
import {Route} from 'react-router-dom'
import MainBaseComponet from './MainBaseComponet';


export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <UserContextConsumer>
                    {
                        UserContext => {
                            return (
                                <React.Fragment>
                                    {/* header */}
                                    <Header />
                                     <div className="main-component" style={{height: "70vh"}}>
                                         {/* main component */}
                                         <Route exact path="/:base" component={MainBaseComponet} />
                                    </div>   
                                    {/* <!-- login Modal --> */}
                                    <Login />
                                    {/* <!-- Modal --> */}
                                    {/* <!-- sing up Modal --> */}
                                    <SingIn />
                                    {/* <!-- Modal --> */}

                                    {/* Footer  */}
                                    <Footer />

                                </React.Fragment>
                            )
                        }
                    }
                </UserContextConsumer>
            </React.Fragment>
        )
    }
}
