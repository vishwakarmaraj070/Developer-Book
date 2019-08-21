import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isFormValid: false,
    }

    loginFormSubmit = () => {
        const { email, password } = this.state
        console.log(email)
        axios.put(`/user/${email}`,{password})
            .then(res=>{
                console.log(res)
                if(res.data.succes === true){
                    window.localStorage.setItem('userId',res.data.data._id )
                    $('.modal-backdrop').removeClass('show')
                    $('#loginModalForm').removeClass('show').css('display', 'none')
                    console.log(window.location.href);
                    if(window.location.href === 'http://localhost:3000/'){
                        window.location.href = `http://localhost:3000/${res.data.data.firstName.toLowerCase()}-book`
                    }
                    else{
                        window.location.href = `https://raj-developer-book.herokuapp.com/${res.data.data.firstName.toLowerCase()}-book`
                    }
                }
                else if(res.data.succes === false){
                    console.log("paaword in correct")
                    $('#loginModalForm span.password').html("Password is incorrect").addClass('red-text')
                }
                else{
                    alert("Email is not Exist")
                }
            })
        
    }

    validationEmail = e => {
        let error = $(e.target).siblings()[1];
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (e.target.value === "") {
            $(error).html('Field is required').removeClass('green-text').addClass('red-text invalid')
        }
        else if (regex.test(e.target.value)) {
            $(error).html("Right").removeClass('red-text invalid').addClass('green-text')
        }
        else {
            $(error).html('Invalid Email').removeClass('green-text').addClass('red-text invalid')
        }
    }

    formValid = () => {
        const { password } = this.state;
        if ($('#loginModalForm span.error').hasClass('invalid')) {
            this.setState({
                isFormValid: false
            })
        }
        else {
            if (password != "") {
                this.setState({
                    isFormValid: true
                })
            }
        }
    }


    render() {
        const {user} = this.props
        return (
            <React.Fragment>
                {/* <!-- login Modal --> */}
                <form autoComplete="off" onSubmit={(e) => {
                    e.preventDefault()
                    this.loginFormSubmit()
                }} >
                    <div className="modal fade" id="loginModalForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog form-dark modal-dialog-centered" role="document">
                            <div className="modal-content card card-image ">
                                <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                                    <div className="modal-header text-center pb-4">
                                        <h3 className="modal-title w-100 white-text font-weight-bold" id="myModalLabel"><strong>Log</strong> <a
                                            className="green-text font-weight-bold"><strong> In</strong></a></h3>
                                        <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="md-form mb-5">
                                            <input onChange={(e) => {
                                                this.setState({
                                                    email: e.target.value
                                                })
                                                this.validationEmail(e);
                                                this.formValid()
                                            }} type="email" value={this.state.email} id="loginEmail" className="form-control white-text" />
                                            <label className="white-text" htmlFor="loginEmail">Your email</label>
                                            <span className="error invalid text-sm"></span>
                                        </div>

                                        <div className="md-form pb-3">
                                            <input onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value
                                                })

                                                $('#loginModalForm span.password').html('')
                                                this.formValid()
                                            }} type="password" value={this.state.password} id="loginPassword5" className="form-control white-text" />
                                            <label className="white-text" htmlFor="loginPassword5">Your password</label>
                                            <span className="error password text-sm"></span>
                                        </div>

                                        <div className="row d-flex align-items-center mb-4">
                                            <div className="text-center mb-3 col-md-12">
                                                <button onClick={(e)=>{
                                                    e.preventDefault();
                                                    this.loginFormSubmit();
                                                }} disabled={!this.state.isFormValid} className="btn btn-success btn-block btn-rounded z-depth-1">Login</button>
                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col-md-12">
                                                <p className="font-small white-text d-flex justify-content-end">New User? <a data-dismiss="modal" data-toggle="modal" data-target="#singupModalForm" className="green-text ml-1 font-weight-bold">
                                                    Sing in</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <!-- Modal --> */}
            </React.Fragment>
        )
    }
}
