// Esse reducer será responsável por tratar as informações da pessoa usuária

import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
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
