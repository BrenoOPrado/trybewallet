// Coloque aqui suas actions

import * as actionTypes from './actionTypes';

const expensesURL = 'https://economia.awesomeapi.com.br/json/all';

export const add = (item) => ({ type: actionTypes.ADD_ITEM, item });

export const addItem = (values) => (dispatch) => fetch(expensesURL)
  .then((response) => response.json())
  .then((expenses) => dispatch(add({ ...values, exchangeRates: expenses })));

export const removeItem = (id) => ({ type: actionTypes.REMOVE_ITEM, id });

export const editItem = (id) => ({ type: actionTypes.EDIT_ITEM, id });

export const edited = (values) => ({ type: actionTypes.EDITED, values });

export const login = (email) => ({ type: actionTypes.LOGIN, email });

export const coin = (currencies) => ({ type: actionTypes.COIN, currencies });

export const fetchCoin = () => (dispatch) => fetch(expensesURL)
  .then((response) => response.json())
  .then((coins) => Object.keys(coins))
  .then((arrCoins) => arrCoins.filter((item) => item !== 'USDT'))
  .then((currencies) => dispatch(coin(currencies)));
