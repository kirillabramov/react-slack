import { handleActions } from 'redux-actions';
 
import { channelsActions } from './actions';

const initialState = {
  currentChannel: null,
  isLoading: true,
};

export const channelsReducer = handleActions(
  {
    [channelsActions.setCurrentChannel]: (state, { payload }) => {
      return {
        ...state,
        currentChannel: payload,
      };
    },
  },
  initialState,
);
