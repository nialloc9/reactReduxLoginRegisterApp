import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

//import reducers
import auth from './auth'
import navBar from './navBar'

//export combined reducers
export default combineReducers({
    auth,
    navBar,
    form: formReducer
})


