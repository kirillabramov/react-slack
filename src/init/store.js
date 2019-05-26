import { createStore } from 'redux';
// import { composeWithDevTools } from './node_modules/redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { enhancedStore } from './middleware/core';

const store = createStore(rootReducer, enhancedStore);

export default store;
