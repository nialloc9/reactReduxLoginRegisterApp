import React, { Component, PropTypes } from 'react'

//import connect
import { connect } from 'react-redux'

//import actions
import {  } from '../actions/index'
import { bindActionCreators } from 'redux'

//import store
import store from '../store'

class Home extends Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        //destructure props and context
        const { firstName, lastName, loggedin } = this.props.auth
        const { replace } = this.context.router

        //check if user is loggedin.. if not use replace from the components context to redirect the user back
        if(!loggedin){
            replace('/');
        }
        return(
            <div>
                <h3>Home</h3>

                <p>Welcome {firstName} {lastName}</p>
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
Home.contextTypes = {
    router: PropTypes.object.isRequired
};

//export Component
export default connect(mapStateToProps, matchDispatchToProps)(Home)