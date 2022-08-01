import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.LOGIN:
    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
};

export default user;
