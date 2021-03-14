import { combineReducers } from 'redux';
import contest from './contest';
import common from './common';

const rootReducer = combineReducers({
	contest,
	common
});

export default rootReducer;
