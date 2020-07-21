import { createStore, applyMiddleware } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer'

const initStore = () => {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  }

export const wrapper = createWrapper(initStore);