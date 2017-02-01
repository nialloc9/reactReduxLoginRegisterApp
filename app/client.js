import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

//store
import { store, dispatch } from './store'

//import cookies
import * as cookie from 'react-cookie'

//import axios
import axios from 'axios'

//import login actions
import { LOGIN_CHECK, loginCheck } from './actions/index'

//app
import App from './App'

//pages
import ForgottonPassword from './pages/ForgottonPassword'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import ValidateEmail from './pages/ValidateEmail'


//entry point
const app = document.getElementById('app')

//login required function
const loginRequired = (nextState, replace)=>{
    //destructure store
    const { auth } = store.getState()

    //check if user us loggedin
    if(auth.loggedin != true){
        //get cookie value
        const userLoggedinToken = cookie.load('userLoggedinToken')

        //http to check user is loggedin
        axios({
            method: 'GET',
            url: '/projects/reactReduxRegisterAndLoginApp/server/login.php',
            params: {
                task: 'LOGIN_CHECK',
                userLoggedinToken
            }
        }).then((response)=>{
            //dispatch action with data from response
            dispatch(loginCheck(response.data))
        })
    }
}

//render igoaloApp and set up routes
ReactDOM.render(
   <Provider store={store}>
      <Router history={hashHistory}>
          <Route path='/' component={App}>
              <IndexRoute component={LandingPage} onEnter={loginRequired}/>
              <Route path='/emailValidate' component={ValidateEmail} />
              <Route path="/fp" component={ForgottonPassword}/>
              <Route path='/home' component={Home}/>
          </Route>
       </Router>
   </Provider>, app
)
