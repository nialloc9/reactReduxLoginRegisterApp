import React, { Component, PropTypes } from 'react'

import axios from 'axios'

class ValidateEmail extends Component{

    //constructor set state and bind methods
    constructor(props){
        super(props)
        this.state = {
            info: '', infoStyle: ''
        }
    }

    validateEmail(){

        //detructure location query params
        const { email, token } = this.props.location.query

        //set timestamp
        const timestamp = Date.now()

        //create data object
        const values = {task: 'VALIDATE_EMAIL', email: email, emailAuthToken : token, timestamp}

        //store component scope
        const componentScope = this

        //send http post request
        axios({
            url: '/projects/reactReduxRegisterAndLoginApp/server/register.php',
            method: 'POST',
            data: values
        }).then((response)=>{
            console.log(response.data)
            if(response.data){
                componentScope.setState({info: 'Email confirmed. Thank you..', infoStyle: 'infoSuccess'})
            }else{
                componentScope.setState({info: 'Sorry we could not confirm your email at this time.', infoStyle: 'infoFailure'})
            }
        })
    }

    //render method
    render(){

        //destructure state
        const { info, infoStyle } = this.state

        return(
            <div>
                <button onClick={this.validateEmail.bind(this)} className='btn btn-primary'>Confirm Email</button>
                <p className={infoStyle}>
                    {info}
                </p>
            </div>
        )
    }
}

//export Component
export default ValidateEmail
