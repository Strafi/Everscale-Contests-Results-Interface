export const SET_SELECTED_SUBGOV = 'common/SET_SELECTED_SUBGOV';

export const setSelectedSubgov = selectedSubgov => dispatch => {
	dispatch({
		type: SET_SELECTED_SUBGOV,
		payload: selectedSubgov
	})
}
