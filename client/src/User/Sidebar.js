import React, { Component } from 'react'
import { UserContextConsumer } from './User.contenxt';
import axios from 'axios';
import SidebarMenu from './SidebarMenu'

export default class UserSidebar extends Component {

    state = {
        isAddMenu: false,
        menu: '',
        item: ''
    }


    addMenu = (id, bookOf) => {
        console.log(bookOf)
        const { menu, item } = this.state
        let menuItem = [{
            item: item,
            isEditItem: false,
            itemData: []
        }]
        if(menu.length > 0){
            if(item.length> 0){
                axios.post(`/user/book/menu/${id}`, { bookOf, menu, menuItem })
                .then(res => {
                    this.props.userbooks(id)
                    this.setState({
                        isAddMenu: false,
                        menu: '',
                        item: ''
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }   
        }
    }


    render() {
        const {toggleSideBar} = this.props
        return (
            <React.Fragment>
                <UserContextConsumer>
                    {UserContext => {
                        return (
                            <React.Fragment>
                                <div
                                    id="slide-out"
                                    className={`side-nav sn-bg-4 fixed ${
                                        toggleSideBar ? "toggleSideBar" : ""
                                      }`}
                                >
                                    <ul className="custom-scrollbar">
                                        {/* <!-- Side navigation links --> */}
                                        <li>
                                            <ul className="collapsible collapsible-accordion">
                                                {UserContext.user.books.map((books, index) => {
                                                    return (
                                                        books.bookOf === UserContext.user.activeBook ? (
                                                            books.book.length > 0 ? (
                                                                books.book.map((book, index) => {
                                                                    return <SidebarMenu key={index} menu={book} user={UserContext.user} userbooks={UserContext.userbooks} getActiveBookPageInfo={UserContext.getActiveBookPageInfo}  />
                                                                })
                                                            ) : (
                                                                    <li className="list-unstyled">
                                                                        <a className="collapsible-header waves-effect arrow-r position-relative">
                                                                        No Menu avialable
                                                                    </a>
                                                                    </li>
                                                                )
                                                        ) : ""
                                                    )
                                                })}
                                                <hr className="hr-dark my-1" />
                                                {/* start add sidebar menu */}
                                                {
                                                    this.state.isAddMenu ? (
                                                        <form className="mx-3" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            this.addMenu(UserContext.user._id, UserContext.user.activeBook)
                                                        }} autoComplete="off">
                                                            <div className="md-form form-sm">
                                                                <input onChange={(e) => {
                                                                    this.setState({
                                                                        menu: e.target.value
                                                                    })
                                                                }} type="text" value={this.state.menu} id="inputSMEx" className="form-control white-text form-control-sm" />
                                                                <label htmlFor="inputSMEx">Menu</label>
                                                            </div>
                                                            <div className="md-form form-sm">
                                                                <input onChange={(e) => {
                                                                    this.setState({
                                                                        item: e.target.value
                                                                    })
                                                                }} type="text" value={this.state.item} id="inputSMEx" className="form-control white-text form-control-sm" />
                                                                <label htmlFor="inputSMEx">Menu Item</label>
                                                            </div>
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                this.addMenu(UserContext.user._id, UserContext.user.activeBook)
                                                            }} type="submit" className="btn btn-primary btn-sm">Add</button>
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                this.setState({
                                                                    isAddMenu:false
                                                                })
                                                            }} type="submit" className="btn btn-primary btn-sm">Cancle</button>
                                                        </form>
                                                        ) : (
                                                            <div>
                                                                {
                                                                    UserContext.user.books.length === 0 ? (
                                                                        <li className="mx-3">No Books availbale</li>
                                                                    ): (
                                                                        <li onClick={(e) => {
                                                                            e.preventDefault()
                                                                            this.setState({
                                                                                isAddMenu: true
                                                                            })
                                                                        }}>
                                                                            <a className="collapsible-header waves-effect arrow-r position-relative">
                                                                                Add Menu <i className="fa fa-plus rotate-icon absolute-top-center mx-3 sidebar-icon-right" />
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                }
                                                {/* end add sidebar menu */}
                                            </ul>
                                        </li>
                                        {/* <!--/. Side navigation links --> */}
                                    </ul>

                                    <div className="sidenav-bg mask-strong" />
                                </div>
                            </React.Fragment>
                        )
                    }}
                </UserContextConsumer>

            </React.Fragment>
        )
    }
}
