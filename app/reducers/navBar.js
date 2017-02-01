//import action types
import { TOGGLE_LOGIN_MODAL } from '../actions/index'

export default function navBar(state ={
  showLogginModalTorF: false
}, action){
  switch(action.type){
      case TOGGLE_LOGIN_MODAL:

      //return new state
      return {
          ...state,
          showLogginModalTorF: action.payload
      }
      break;
  }
  return state
}
