import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import { logger, barMiddleware, fooMiddleware, thunk, promiseMiddleware } from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware,
      fooMiddleware,
      barMiddleware,
      logger,
    )
  )
);

console.log(store.getState())

store.dispatch({ type: 'TEST_ACTION', payload: 'payload from action' })

const action = store.dispatch({ type: 'fetch', promise: fetch('https://jsonplaceholder.typicode.com/posts/1') })

console.log('logging action', action)

store.dispatch((getState, dispatch) => {
  if (getState().isAuthenticated) {
    dispatch({ type: 'IS_AUTHENTICATED' })
  }
  return ({
    type: 'NOT_AUTHENTICATED'
  })
})


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
