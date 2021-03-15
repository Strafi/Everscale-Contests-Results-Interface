import {
	SET_SELECTED_SUBGOV,
	SET_IS_TUTORIAL_ACTIVE,
} from '../actions/common';
import { DEFAULT_GOVERNANCE } from 'src/constants';

const initialState = {
	selectedGovernance: {
		name: DEFAULT_GOVERNANCE.NAME,
		fullName: DEFAULT_GOVERNANCE.FULL_NAME
	},
	isTutorialActive: false,
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

		case SET_IS_TUTORIAL_ACTIVE: {
			return {
				...state,
				isTutorialActive: payload,
			}
		}

		default:
			return state
	}
}

export default commonReducer
