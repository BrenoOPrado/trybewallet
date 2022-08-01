import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const editItem = (state, { values }) => {
  const { expenses, idToEdit } = state;
  const { value, description, currency, method, tag } = values;
  expenses[idToEdit] = {
    ...expenses[idToEdit],
    value,
    description,
    currency,
    method,
    tag,
  };
  return ({
    ...state,
    expenses,
    editor: false,
    idToEdit: 0,
  });
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.EDITED:
    return editItem(state, action);
  case actionTypes.EDIT_ITEM:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
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
