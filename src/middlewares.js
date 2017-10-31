export const logger = store => next => action => {
  console.log('previous state: ', store.getState())
  console.log('dispatched action: ', action)
  const result = next(action)
  console.log('next state: ', store.getState())

  return result;
}

export const fooMiddleware = store => next => action => {
  const newAction = {
    ...action,
    payload: action.payload + ' from fooMiddleware'
  }

  return next(newAction);
}

export const barMiddleware = store => next => action => {
  const newAction = {
    ...action,
    payload: action.payload + ' from barMiddleware'
  }

  return next(newAction);
}

export const promiseMiddleware = store => next => action => {
  if (action.promise) {
    store.dispatch({type: action.type + '_STARTED'})

    return action.promise.then(
      (result) => store.dispatch({ type: action.type + '_FINISHED', payload: result }),
      (e) => store.dispatch({type: action.type + '_ERROR', error: e})
    )
  }

  return next(action);
}

export const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.getState, store.dispatch);
  }

  return next(action);
}
