import React, { Component } from "react";
import axios from "axios";

const UserContext = React.createContext();

export default class UserContenxtProvider extends Component {
    state = {
        user: {},
        isUserLoad: false,
        activeBook: "",
        activePageInfo: {
            id: "",
            menu: "",
            menuItem: ""
        }
    };

    LoginUser = () => {
        axios.get("/user").then(res => {
            this.setState(
                {
                    user: res.data.user,
                    isUserLoad: true
                },
                () => {
                    console.log(this.state.user);
                }
            );
        });
    };
    userbooks = id => {
        axios.get(`/user/book/${id}`).then(res => {
            this.setState(
                {
                    user: res.data.data,
                    isUserLoad: true
                },
                () => {
                    console.log(this.state.user);
                }
            );
        });
    };

    // set active book
    setActiveBook = bookOf => {
        this.setState({
            activeBook: bookOf
        });
    };

    getActiveBookPageInfo = (id, menu, menuItem) => {
        let activePageInfo = {
            id,
            menu,
            menuItem,
        };
        this.setState({
            activePageInfo
        });
    };

    render() {
        return (
            <React.Fragment>
                <UserContext.Provider
                    value={{
                        ...this.state,
                        LoginUser: this.LoginUser,
                        userbooks: this.userbooks,
                        setActiveBook: this.setActiveBook,
                        getActiveBookPageInfo: this.getActiveBookPageInfo
                    }}
                >
                    {this.props.children}
                </UserContext.Provider>
            </React.Fragment>
        );
    }
}

const UserContextConsumer = UserContext.Consumer;
export { UserContenxtProvider, UserContextConsumer };
