import { createStore, applyMiddleware} from 'redux';

import theReducer from '../reducers/TheReducer';
import thunk from 'redux-thunk'
/* import {composeWithDevtools} from 'redux-devtools-extension'; */

const store = createStore(theReducer, applyMiddleware(thunk));

export default store;