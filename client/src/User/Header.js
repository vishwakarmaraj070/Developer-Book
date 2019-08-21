import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { UserContextConsumer } from './User.contenxt';
import axios from 'axios'
import $ from 'jquery'

export default class UserHeader extends Component {

  state = {
    isAddBook: false,
    bookOf:'',
    toggleSideBar: false
  }

  handleMainSlide = () => {
    $("footer").toggleClass("main-slide");
    $("main.main-book-content").toggleClass("main-slide");
  };

  addBook =(id)=>{
    const {bookOf} = this.state;
    if(this.state.bookOf.length > 1){
    axios.post(`/user/book/${id}`, {bookOf})
      .then(res=>{
        this.props.UserContext.userbooks(id)
        this.setState({
          bookOf: ''
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

  activeBook=(id, activeBook)=>{
    axios.put(`/user/book/activeBook/${id}`,{activeBook})
    .then(res=>{
      this.props.UserContext.userbooks(id)
    })
    .catch(err=>{
      console.log(err)
    })
  }


  logOut = ()=>{
    console.log('logout click')
  }

  render() {
    return (
      <React.Fragment>
        <UserContextConsumer>
          {UserContext => {
            console.log(UserContext.user)
            return (
              <React.Fragment>
                <header>
                  <nav className="double-nav fixed-top navbar navbar-expand-lg navbar-toggleable-md pl-0">
                    <div className="container-fluid">
                    <div className="float-left mr-5">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            toggleSideBar: !this.state.toggleSideBar
                          });
                          this.handleMainSlide();
                        }}
                        data-activates="slide-out"
                        className="button-collapse"
                      >
                        <i className="fa fa-bars" />
                      </a>
                    </div>
                    <Link className="navbar-brand waves-effect mx-3" to='/' >
                        <strong className="blue-text text-capitalize">Developer World</strong>
                      </Link>
                      <Link className="navbar-brand waves-effect mx-3" to={`/${UserContext.user.firstName.toLowerCase()}-book`} >
                        <strong className="blue-text text-capitalize">{`${UserContext.user.firstName} ${UserContext.user.lastName}`}</strong>
                      </Link>

                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#userNavbar"
                        aria-controls="userNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>

                      <div className="collapse navbar-collapse" id="userNavbar">

                        <ul className="navbar-nav mx-auto">
                          {
                            UserContext.user.books.length > 0 ?(
                              UserContext.user.books.map((book, index) => {
                                return(
                                  <li onClick={(e)=>{
                                    e.preventDefault();
                                    this.activeBook(UserContext.user._id, book.bookOf)
                                  }} key={index} className="nav-item ">
                                    <Link to={`/${UserContext.user.firstName.toLowerCase()}-book/${book.bookOf}`} className="border border-0 border-light mx-0 nav-link rounded text-capitalize waves-effect">
                                      {
                                        book.bookOf
                                      }
                                    </Link>                          
                                  </li>
                                )
                              })
                            ) : (
                              ""
                            )
                          } 
                        </ul>

                        <ul className="navbar-nav nav-flex-icons">
                          {
                            this.state.isAddBook ? (
                              <li className="nav-item ">
                                <form onSubmit={(e)=>{
                                  e.preventDefault()
                                  this.addBook(UserContext.user._id)
                                  this.setState({
                                    isAddBook: false
                                  })
                                }}>
                                <div className="md-form input-group m-0">
                                  <input onChange={(e)=>{
                                    this.setState({
                                      bookOf: e.target.value
                                    })
                                  }} type="text" value={this.state.bookOf} className="form-control white-text"  placeholder="Book name" aria-label="Book name"
                                    aria-describedby="MaterialButton-addon2" />
                                  <div className="input-group-append">
                                    <button onClick={(e) => {
                                      e.preventDefault()
                                      this.addBook(UserContext.user._id)
                                      this.setState({
                                        isAddBook: false,
                                      })
                                    }} className="btn m-0 nav-link py-2 waves-effect" type="button" id="MaterialButton-addon2">Add</button>
                                  </div>
                                </div>
                                </form>
                              </li>
                            ) : (
                                <li className="nav-item">
                                  <button onClick={(e) => {
                                    e.preventDefault()
                                    this.setState({
                                      isAddBook: true
                                    })
                                  }} className="btn m-0 nav-link py-2 waves-effect">Add Book</button>
                                </li>

                              )
                          }
                          <li className="nav-item ml-2">
                                  <button onClick={(e) => {
                                    e.preventDefault()
                                    this.logOut()
                                  }} className="btn m-0 nav-link py-2 waves-effect">Log out</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>

                  {/* add book modal */}

                  {/*  */}
                  {/* sidebar here */}
                  <Sidebar  userbooks={UserContext.userbooks} toggleSideBar={this.state.toggleSideBar}/>
                </header>
              </React.Fragment>
            )
          }}
        </UserContextConsumer>
      </React.Fragment>
    )
  }
}
