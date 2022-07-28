// Coloque aqui suas actions

import * as actionTypes from './actionTypes';

export const addItem = (item) => ({ type: actionTypes.ADD_ITEM, item });

export const removeItem = (item) => ({ type: actionTypes.REMOVE_ITEM, item });

export const editItem = (index) => ({ type: actionTypes.EDIT_ITEM, index });

export const login = (email) => ({ type: actionTypes.LOGIN, email });
