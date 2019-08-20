import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery'

export default class SingIn extends Component {

    state = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        conformPassword:'',
        signUpUser: null,
        isSaved: null,
        isFormValid: false

    }


    onSingUpSubmit = () =>{
        const {firstName, lastName , email, password, conformPassword} = this.state
        const user = {
            firstName,
            lastName,
            email,
            password,
            conformPassword
        }
        
        axios.post('/user', user)
            .then(res => {
                this.setState({
                    signUpUser: res.data.data,
                    isSaved: res.data.succes
                },()=>{
                    $('#notification').addClass('show')
                    if(this.state.isSaved){
                        this.setState({
                            firstName : '',
                            lastName: '',
                            email: '',
                            password: '',
                            conformPassword: ''
                        })
                        $('#singupModalForm').removeClass('show').css('display', 'none');
                        $('#loginModalForm').addClass('show').css('display', 'block')
                    }
                    console.log(res.data)
                })
            })
            setTimeout(() => {
                $('#notification').removeClass('show')
            }, 5000);
    }


    validateFieldRequired = (e)=>{
        let error =  $(e.target).siblings()[1];
        if(e.target.value===""){
            $(error).html('Field is required').removeClass('green-text').addClass('red-text')
        }
        else{
            $(error).html("Right").removeClass('red-text invalid').addClass('green-text')
        }
    }

    validForm = ()=> {
        if($('#singupModalForm span.error').hasClass('invalid')){
            this.setState({
                isFormValid: false
            })
        }
        else{
            this.setState({
                isFormValid: true
            })
        }
    }

    validationEmail = e => {
        let error =  $(e.target).siblings()[1];
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(e.target.value===""){
            $(error).html('Field is required').removeClass('green-text').addClass('red-text invalid')
        }
        else if(regex.test(e.target.value)){
            $(error).html("Right").removeClass('red-text invalid').addClass('green-text')
        }
        else{
            $(error).html('Invalid Email').removeClass('green-text').addClass('red-text invalid')
        }
    }

    validatePassword = e => {
        let error =  $(e.target).siblings()[1];
        if(e.target.value.length < 5){
            if(e.target.value ===""){
                $(error).html('Field is required').removeClass('green-text').addClass('red-text invalid')
            }
            else{
                $(error).html('minimum 5 carrecter required').removeClass('green-text').addClass('red-text invalid')
            }

        }
        else if(this.state.conformPassword != e.target.value){
            $('span.conform').html('password did not match').removeClass('green-text').addClass('invalid red-text')
        }
        else{
            $(error).html("Right").removeClass('red-text invalid').addClass('green-text')
        }



    }

    validateConformPass = e =>{
        const { password, conformPassword} = this.state
        let error =  $(e.target).siblings()[1];
        if(e.target.value !== password ){
            if(e.target.value ===""){
                $(error).html('Field is required').removeClass('green-text').addClass('red-text invalid')
            }
            else{
                $(error).html('password did not match').removeClass('green-text').addClass('red-text invalid')
            }
        }
        else{
            $(error).html("Conformed").removeClass('red-text invalid').addClass('green-text')
        }
    }


    render() {
        return (
            <React.Fragment>
                {/* <!-- login Modal --> */}
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.onSingUpSubmit()
                }} autoComplete="off" >
                <div className="modal fade" id="singupModalForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog form-dark modal-dialog-centered" role="document">
                        <div className="modal-content card card-image ">
                            <div className="text-white rgba-stylish-strong py-y px-5 z-depth-4">
                                <div className="modal-header text-center pb-4">
                                    <h3 className="modal-title w-100 white-text font-weight-bold" id="myModalLabel"><strong>Sign</strong> <a
                                        className="green-text font-weight-bold"><strong> Up</strong></a></h3>
                                    <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="md-form">
                                        <input onChange={(e)=>{
                                            this.setState({
                                                firstName: e.target.value
                                            })
                                            this.validateFieldRequired(e)
                                            this.validForm()
                                        }} type="text" id="txtFirstName" value={this.state.firstName} className="form-control white-text" />
                                        <label className="white-text" htmlFor="txtFirstName">First Name</label>
                                        <span className="error invalid text-sm"></span>
                                    </div>
                                    <div className="md-form">
                                        <input onChange={(e)=>{
                                            this.setState({
                                                lastName: e.target.value
                                            })
                                            this.validateFieldRequired(e)
                                            this.validForm()
                                        }} type="text" id="txtLastName" value={this.state.lastName} className="form-control white-text" />
                                        <label className="white-text" htmlFor="txtLastName">Last Name</label>
                                        <span className="error invalid text-sm"></span>
                                    </div>
                                    <div className="md-form">
                                        <input onChange={(e)=>{
                                            this.setState({
                                                email: e.target.value
                                            })
                                            this.validateFieldRequired(e)
                                            this.validationEmail(e)
                                            this.validForm()
                                        }} type="email" id="txtEmail" value={this.state.email} className="form-control white-text" />
                                        <label className="white-text" htmlFor="txtEmail">Your email</label>
                                        <span className="error invalid text-sm"></span>
                                    </div>
                                    <div className="md-form ">
                                        <input onChange={(e)=>{
                                            this.setState({
                                                password: e.target.value
                                            })
                                            this.validateFieldRequired(e)
                                            this.validatePassword(e)
                                            this.validForm()
                                        }} type="password" id="txtPassword" value={this.state.password} className="form-control white-text" />
                                        <label className="white-text" htmlFor="txtPassword">Password</label>
                                        <span className="error invalid text-sm"></span>
                                    </div>
                                    <div className="md-form pb-3">
                                    <input onChange={(e)=>{
                                            this.setState({
                                                conformPassword: e.target.value
                                            })
                                            this.validateFieldRequired(e)
                                            this.validateConformPass(e)
                                            this.validForm()
                                        }} type="password" id="txtConformPassword" value={this.state.conformPassword} className="form-control white-text" />
                                        <label className="white-text" htmlFor="txtConformPassword">Conform Password</label>
                                        <span className="error invalid conform text-sm"></span>
                                    </div>

                                    <div className="row d-flex align-items-center mb-4">
                                        <div className="text-center mb-3 col-md-12">
                                            <button disabled={!this.state.isFormValid} type="submit" className="btn btn-success btn-block btn-rounded z-depth-1">Sing up</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="font-small white-text d-flex justify-content-end">Already have Account? <a data-dismiss="modal" data-toggle="modal" data-target="#loginModalForm" className="green-text ml-1 font-weight-bold">
                                                Log in</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
                {/* <!-- Modal --> */}

                {/* notification msg */}

                <div className={`modal fade right `} id="notification" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-side modal-top-right" role="document">
                    <div className={`modal-content mt-5 ${this.state.isSaved ? 'success-color-dark': 'danger-color-dark'}`}>
                        <div className="d-flex justify-content-between modal-body">
                            {
                                this.state.isSaved ? (
                                    <p className="mb-0">saved successfully</p>
                                ): (
                                    <p className="mb-0">Not saved successfully
                                    <span className="ml-2">This Email is Already Exist</span></p>
                                )
                            }
                            <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                                        <span onClick={(e=>{
                                            $('#notification').removeClass('show')
                                        })} aria-hidden="true">&times;</span>
                                    </button>
                        </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
