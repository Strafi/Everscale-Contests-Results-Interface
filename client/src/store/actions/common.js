export const SET_SELECTED_SUBGOV = 'common/SET_SELECTED_SUBGOV';
export const SET_IS_TUTORIAL_ACTIVE = 'common/SET_IS_TUTORIAL_ACTIVE';

export const setSelectedSubgov = selectedSubgov => dispatch => {
	dispatch({
		type: SET_SELECTED_SUBGOV,
		payload: selectedSubgov
	})
}

export const setIsTutorialActive = isActive => dispatch => {
	dispatch({
		type: SET_IS_TUTORIAL_ACTIVE,
		payload: isActive,
	})
}
