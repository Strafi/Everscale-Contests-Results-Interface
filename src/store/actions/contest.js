export const SET_CONTEST_INFO = 'contest/SET_CONTEST_INFO';
export const SET_BULK_CONTESTS_INFO = 'contest/SET_BULK_CONTESTS_INFO';
export const SET_SUBMISSIONS_INFO = 'contest/SET_SUBMISSIONS_INFO';
export const SET_JURY_INFO = 'contest/SET_JURY_INFO';

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

export const setJuryInfo = (address, juryStats) => dispatch => {
	dispatch({
		type: SET_JURY_INFO,
		payload: {
			address,
			juryStats,
		},
	})
}
