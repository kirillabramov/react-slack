import { handleActions } from 'redux-actions';

import { authActions } from './actions';

const initialState = {
  currentUser: null,
  isLoading: true,
};

export const authReducer = handleActions(
  {
    [authActions.setUser]: (state, { payload }) => {
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };
    },
    [authActions.clearUser]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
  initialState,
);
