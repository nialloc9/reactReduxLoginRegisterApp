/*import action types*/
import { USER_LOGIN, USER_LOGOUT, UPDATE_AUTH_INFO, LOGIN_CHECK } from '../actions/index'

//export reducer
export default function auth(state={
  loggedin: false,
  info: ""
}, action){

  switch(action.type){
    case USER_LOGIN:
      //return data fetched from database
      return {
        ...state,
        ...action.payload
      };
      break;

    case USER_LOGOUT:
      return{
        ...state,
        loggedin: false,
        info: ''
      }
      break;

      case UPDATE_AUTH_INFO:
        return {
          ...state,
          ...action.payload
        }
        break;
      case LOGIN_CHECK:

        return{
            ...state,
            ...action.payload
        }
        break;
  }
  return state;
}
