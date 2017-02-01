import { applyMiddleware, createStore } from 'redux'

//import middleware
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

//reducers
import reducers from './reducers'

//apply middleware
const middleware = applyMiddleware(logger(), thunk, promise())

//create store
const store = createStore(reducers, middleware)

//create dispatch
const dispatch = store.dispatch;

//export store and dispatch
export { store, dispatch }
