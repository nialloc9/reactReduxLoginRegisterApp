//import cookie
import * as cookie from 'react-cookie'

//log in user
const USER_LOGIN = 'USER_LOGIN'
const authLogin = (auth) => {

  //add loggedin
  auth.loggedin = true

  //expires in 24hrs
  let maxAge = 3600 * 24

  //check if user wishes to stay loggedin and if it has change maxAge to 1 year
  if(auth.keepMeLoggedin){
      maxAge = 3600 * 24 * 365
  }

  //create cookie from data
  cookie.save('userLoggedinToken', auth.loggedinToken, {maxAge})

  //user attempting to log in
  return{
    type: USER_LOGIN,
    payload: auth
  }
}

//logout user
const USER_LOGOUT = 'USER_LOGOUT'
const authLogout = () => {

    //remove cookie
    cookie.remove('userLoggedinToken')

    //user attempting to log out
    return{
        type: USER_LOGOUT
    }
}

//update auth info
const UPDATE_AUTH_INFO = 'UPDATE_AUTH_INFO'
const updateAuthInfo = (id)=>{
  return{
    type: UPDATE_AUTH_INFO,
    payload: id
  }
}

//check user is loggedin
const LOGIN_CHECK = 'LOGIN_CHECK'
const loginCheck = (userData)=>{

  //check user data
  let data = {loggedin: false, info: ''}

  if(userData != false){
      data ={
          ...userData,
          loggedin: true,
          info: ''
      }
  }
  return{
    type: LOGIN_CHECK,
    payload: data
  }
}

export {USER_LOGIN, authLogin, USER_LOGOUT, authLogout, UPDATE_AUTH_INFO, updateAuthInfo, LOGIN_CHECK, loginCheck}
