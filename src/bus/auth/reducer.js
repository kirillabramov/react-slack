import { handleActions } from 'redux-actions';

import { authActions } from './actions';

const initialState = {
  currentUser: null,
  isLoading: false,
};

export const authReducer = handleActions(
  {
    [authActions.setUser]: (state, { payload }) => {
      console.log(payload, 'PAYLOAD');
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };
    },
  },
  initialState,
);
