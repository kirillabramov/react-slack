import { combineReducers } from 'redux';

import { authReducer as auth } from '../bus/auth/reducer';
import { channelsReducer as channels } from '../bus/channels/reducer';

export const rootReducer = combineReducers({
  auth,
  channels,
});
