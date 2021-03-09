export const SET_CONTEST_INFO = 'contest/SET_CONTEST_INFO';
export const SET_BULK_CONTESTS_INFO = 'contest/SET_BULK_CONTESTS_INFO';
export const SET_SUBMISSIONS_INFO = 'contest/SET_SUBMISSIONS_INFO';

export const setContestInfo = contest => dispatch => {
	dispatch({
		type: SET_CONTEST_INFO,
		payload: contest
	})
}

export const setBulkContestsInfo = bulkContests => dispatch => {
	dispatch({
		type: SET_BULK_CONTESTS_INFO,
		payload: bulkContests
	})
}

export const setSubmissionsInfo = (address, submissions) => dispatch => {
	dispatch({
		type: SET_SUBMISSIONS_INFO,
		payload: {
			address,
			submissions,
		},
	})
}
