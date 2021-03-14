import {
	SET_SELECTED_SUBGOV,
} from '../actions/common';
import { DEFAULT_GOVERNANCE } from 'src/constants';

const initialState = {
	selectedGovernance: {
		name: DEFAULT_GOVERNANCE.NAME,
		fullName: DEFAULT_GOVERNANCE.FULL_NAME
	},
}
  
function commonReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_SELECTED_SUBGOV: {
			return {
				...state,
				selectedGovernance: payload || initialState.selectedGovernance,
			}
		}

		default:
			return state
	}
}

export default commonReducer
