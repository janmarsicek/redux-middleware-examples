const initialState = {
  actionPayload: ''
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case 'TEST_ACTION':
      return ({
        ...state,
        actionPayload: action.payload,
      })
    default:
      return state
  }
}

export default reducer;
