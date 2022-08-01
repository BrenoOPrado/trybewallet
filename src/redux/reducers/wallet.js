// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.REMOVE_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };
  case actionTypes.ADD_ITEM:
    return ({
      ...state,
      expenses: [...state.expenses, {
        ...action.item,
        id: state.expenses.length,
      }],
    });
  case actionTypes.COIN:
    return ({
      ...state,
      currencies: action.currencies,
    });

  default:
    return state;
  }
};

export default wallet;
