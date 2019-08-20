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
                                     <main className="main-component">
                                         {/* main component */}
                                         <Route exact path="/dev/:base" component={MainBaseComponet} />
                                    </main>   
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
