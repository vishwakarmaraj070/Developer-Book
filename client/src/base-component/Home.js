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
                                     <div className="main-component flex-center mt-5" style={{minHeight: "100vh"}}>

                                         {
                                             this.state.isNotHome ? (
                                                 <div className="row w-100">
                                                     <div className="col-12">
                                                    <Route exact path="/dev/:base" component={MainBaseComponet} />
                                                    </div>
                                                    <div className="col-12">
                                                    <div className="video-container w-50 m-5 mx-auto">
                                                        <h2 className="border-bottom border-danger font-weight-bold h2-responsive mb-4 text-center text-default">How to Use</h2>
                                                        <div className="embed-responsive embed-responsive-16by9">
                                                            <iframe width="560" height="315" src="https://www.youtube.com/embed/jrnJp6VEGmA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                             ) : (
                                                 <div className="video-container w-50 m-5">
                                                     <h2 className="border-bottom border-danger font-weight-bold h2-responsive mb-4 text-center text-default">How to Use</h2>
                                                     <div className="embed-responsive embed-responsive-16by9">
                                                        <iframe width="560" height="315" src="https://www.youtube.com/embed/jrnJp6VEGmA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                    </div>
                                                </div>
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
