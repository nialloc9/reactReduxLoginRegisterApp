import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import axios from 'axios'

//import form pages
import FirstPage from './../components/register/FirstPage'
import SecondPage from './../components/register/SecondPage'

//import actions
import { updateAuthInfo } from '../actions'

import { bindActionCreators } from 'redux'

import store from '../store'

class Register extends Component{

  //constructor set state and bind methods
  constructor(props){
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1, info: ''
    }
  }

  handleRegisterUser(values){

      //add task and timestamp
      values.task = 'UPDATE_AUTH_INFO'
      values.timestamp = Date.now()

      //keep scope of component
      const componentScope = this

      axios({
          url: "/projects/reactReduxRegisterAndLoginApp/server/register.php",
          method: 'post',
          data: values
      }).then(function(response){
          //console.log(response.data)
          const infoMessage = (response.data) ? 'Success. An email has been sent to ' + response.data: 'Could not register'
          componentScope.setState({info: infoMessage })
      }).catch((error)=>{
          //console.log(error.getMessage())
          componentScope.setState({info: 'Sorry we could not register you. Please try again later.'})
      })
  }



  //go forward one page
  nextPage(){
    this.setState({page: this.state.page + 1})
  }

  //go back one page
  previousPage(){
    this.setState({page: this.state.page - 1})
  }

  render(){
    //destructure state
    const{ page, info } = this.state

    return (
      <div>
        {page === 1 && <FirstPage onSubmit={this.nextPage}/>}
        {page === 2 && <SecondPage onSubmit={this.handleRegisterUser.bind(this)} previousPage={this.previousPage}/>}

        <p className="infoDefault">{info}</p>
      </div>
    )
  }
}



//map state to props for component
function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

//match actions to dispatch
function matchDispatchToProps(dispatch){
  return bindActionCreators({ updateAuthInfo: updateAuthInfo }, dispatch)
}

//export Component
export default connect(mapStateToProps, matchDispatchToProps)(Register)
