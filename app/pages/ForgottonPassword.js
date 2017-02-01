import React, { Component } from 'react'

//import findDOMNode
import { findDOMNode } from 'react-dom'

//import axios
import axios from 'axios'

class ForgottonPassword extends Component{

    constructor(props){
        super(props)
        this.state = {
            tokenProvidedInfo: '',
            tokenProvidedInfoStyle: '',
            tokenNotProvidedInfo: '',
            tokenNotProvidedInfoStyle: ''
        }
    }

    //no token or email provided
    handleNoTokenBtnClick(){
        //create data object
        const email = findDOMNode(this.refs.forgottonPasswordEmail).value
        const timestamp = Date.now()
        const task = 'FORGOTTON_PASSWORD'
        const data = {task, email, timestamp}

        //store component scope
        const componentScope = this

        //http request to send email to user with reset link
        axios({
            url: '/projects/reactReduxRegisterAndLoginApp/server/login.php',
            method: 'POST',
            data
        }).then((response)=>{

            if(response.data != false){
                componentScope.setState({
                    ...state,
                    tokenNotProvidedInfo: 'Email sent to ' + response.data,
                    tokenNotProvidedInfoStyle: 'infoSuccess'
                })
            }else{
                componentScope.setState({
                    ...state,
                    tokenNotProvidedInfo: 'Please try again later.',
                    tokenNotProvidedInfoStyle: 'infoFailure'
                })
            }

        }).catch((error)=>{
            console.log(error)
        })
    }

    //token provided with email
    handleTokenBtnClick(){

        //detructure location query params
        const { email, token } = this.props.location.query

        //create data object
        const password = findDOMNode(this.refs.newPassword).value
        const timestamp = Date.now()
        const task = 'FORGOTTON_PASSWORD_CHANGE_PASSWORD'

        const data = {task, email, password, emailAuthToken: token, timestamp}

        //store component scope
        const componentScope = this

        //http request to send email to user with reset link
        axios({
            url: '/projects/reactReduxRegisterAndLoginApp/server/login.php',
            method: 'POST',
            data
        }).then((response)=>{
            //check response
            if(response.data != false){
                componentScope.setState({
                    tokenProvidedInfo: 'Password reset.',
                    tokenProvidedInfoStyle: 'infoSuccess'
                })
            }else{
                componentScope.setState({
                    tokenProvidedInfo: 'Please try again later.',
                    tokenProvidedInfoStyle: 'infoFailure'
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    //render method
    render(){

        //destruct state
        const { tokenNotProvidedInfo, tokenNotProvidedInfoStyle, tokenProvidedInfo, tokenProvidedInfoStyle } = this.state;

        //no token
        const forgottonPassNoToken =
            <div>
                <label for="forgottonPasswordEmail">Email</label>
                <input id="forgottonPasswordEmail" type="email" ref="forgottonPasswordEmail" className="form-control"/>
                <br />
                <button type="button" className="btn btn-primary" onClick={()=>{this.handleNoTokenBtnClick()}}>Reset</button>
                <span className={tokenNotProvidedInfoStyle}>{tokenNotProvidedInfo}</span>
            </div>

        //token
        const forgottonPassToken =
            <div>
                <label for="newPassword">New Password</label>
                <input id="newPassword" type="password" ref="newPassword" className="form-control"/>
                <br />
                <button type="button" className="btn btn-primary" onClick={()=>{this.handleTokenBtnClick()}}>Reset</button>
                <span className={tokenProvidedInfoStyle}>{tokenProvidedInfo}</span>
            </div>

        //detructure location query params
        const { email, token } = this.props.location.query

        const forgottonPasswordForm = ((email != null) && (token != null)) ? forgottonPassToken  : forgottonPassNoToken

        return(
            <div className="forgottonPassword">
                <div className="formWrapper">
                    {forgottonPasswordForm}
                </div>
            </div>
        )
    }
}

export default ForgottonPassword