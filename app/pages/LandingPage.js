import React, { Component, PropTypes } from 'react'

//components
import Register from '../containers/Register'

//import connect
import { connect } from 'react-redux'

//import store
import store from '../store'

//import actions
import { bindActionCreators } from 'redux'
import {  } from '../actions'

//create class
class LandingPage extends Component{

  //render method
  render(){

      //destructure props and context
      const { loggedin } = this.props.auth
      const { replace } = this.context.router

      //check if user is loggedin.. if not use replace from the components context to redirect the user back
      if(loggedin){
          replace('/home');
      }

    return(
      <div>
        <div className='row'>
          <div className='col-sm-6'>
            <h1>LandingPage</h1>
          </div>
          <div className='col-sm-6'>
            <Register />
          </div>
        </div>
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
    return bindActionCreators({ }, dispatch)
}

//set contextTypes.. add router to component context
LandingPage.contextTypes = {
    router: PropTypes.object.isRequired
};

//export Component
export default connect(mapStateToProps, matchDispatchToProps)(LandingPage)
