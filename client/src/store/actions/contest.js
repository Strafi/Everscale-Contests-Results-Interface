export const SET_CONTEST_INFO = 'contest/SET_CONTEST_INFO';
export const SET_BULK_CONTESTS_INFO = 'contest/SET_BULK_CONTESTS_INFO';
export const ADD_BULK_CONTESTS_INFO = 'contest/ADD_BULK_CONTESTS_INFO';
export const SET_SUBMISSIONS_INFO = 'contest/SET_SUBMISSIONS_INFO';
export const SET_JURY_INFO = 'contest/SET_JURY_INFO';
export const UPDATE_SUBMISSION_REWARD = 'contest/UPDATE_SUBMISSION_REWARD';
export const SET_REMOVED_JUROR = 'contest/SET_REMOVED_JUROR';

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

export const addBulkContestsInfo = bulkContests => dispatch => {
	dispatch({
		type: ADD_BULK_CONTESTS_INFO,
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

export const updateSubmissionReward = payload => dispatch => {
	dispatch({
		type: UPDATE_SUBMISSION_REWARD,
		payload,
	})
}

export const setRemovedJuror = (address, juryAddr) => ({
	type: SET_REMOVED_JUROR,
	payload: {
		address,
		juryAddr,
	}
});
