import React, { Component } from 'react'
import Login from './Login';
import SingIn from './Sing-in';
import { UserContextConsumer } from '../User/User.contenxt';
import Header from './Header';
import Footer from './Footer';
import {Route} from 'react-router-dom'
import MainBaseComponet from './MainBaseComponet';


export default class Home extends Component {

    state={
        isNotHome: false
    }

    isNotHome =(value)=>{
        console.log(value)
        this.setState({
            isNotHome: true
        })
    }
    render() {
        return (
            <React.Fragment>
                <UserContextConsumer>
                    {
                        UserContext => {
                            return (
                                <React.Fragment>
                                    
                                    {/* header */}
                                    <Header isNotHome={this.isNotHome}/>
                                     <div className="main-component flex-center" style={{height: "70vh"}}>

                                         {
                                             this.state.isNotHome ? (
                                                <Route exact path="/dev/:base" component={MainBaseComponet} />
                                             ) : (
                                                <h1 className="display-1 text-info">Developer World Coming Soon</h1>
                                             )
                                         }
                                        
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
