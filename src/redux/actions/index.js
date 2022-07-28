// Coloque aqui suas actions

import * as actionTypes from './actionTypes';

export const addItem = (item) => ({ type: actionTypes.ADD_ITEM, item });

export const removeItem = (item) => ({ type: actionTypes.REMOVE_ITEM, item });

export const editItem = (index) => ({ type: actionTypes.EDIT_ITEM, index });

export const login = (email) => ({ type: actionTypes.LOGIN, email });

export const coin = (currencies) => ({ type: actionTypes.COIN, currencies });

export const fetchCoin = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((coins) => Object.keys(coins))
  .then((arrCoins) => arrCoins.filter((item) => item !== 'USDT'))
  .then((currencies) => dispatch(coin(currencies)));
