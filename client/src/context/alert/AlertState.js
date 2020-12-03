import React, { Children, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // SET ALERT
  const setAlert = (msg, type) => {
    const id = uuidv4();
  };
  return (
    <AlertContext.Provider value={{}}>{props.children}</AlertContext.Provider>
  );
};
