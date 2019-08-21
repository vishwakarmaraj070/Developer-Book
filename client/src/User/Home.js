import React, { Component } from 'react'
import UserHeader from './Header';
import { Route } from 'react-router-dom'
import UserMain from './UserMain';
import { UserContextConsumer } from './User.contenxt';
import Footer from '../base-component/Footer';

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <UserContextConsumer>
                    {UserContext => {
                        const { user } = UserContext;
                        console.log(user)
                        return (
                            <React.Fragment>
                                {/* header */}
                                <UserHeader UserContext={UserContext} />
                                <main className="main-book-content m-4" style={{minHeight: "80vh"}}>
                                    
                                    <Route path={`/${user.firstName}-book/${user.activeBook}/:userBook`} component={UserMain} />
                                </main>
                                {/* footer */}
                                <Footer />
                            </React.Fragment>
                        )
                    }}
                </UserContextConsumer>
            </React.Fragment>
        )
    }
}