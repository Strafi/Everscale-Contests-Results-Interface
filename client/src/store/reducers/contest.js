import {
	SET_CONTEST_INFO,
	SET_BULK_CONTESTS_INFO,
	ADD_BULK_CONTESTS_INFO,
	SET_SUBMISSIONS_INFO,
	SET_JURY_INFO,
	SET_REMOVED_JUROR,
	UPDATE_SUBMISSION_REWARD,
} from '../actions/contest';

const initialState = {
	contestsInfo: {},
	submissionsInfo: {},
	jurorsInfo: {},
	removedJurors: {},
}
  
function contestReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_CONTEST_INFO: {
			const contestsInfo = { ...state.contestsInfo };
			contestsInfo[payload.address] = payload;

			return {
				...state,
				contestsInfo,
			}
		}

		case SET_BULK_CONTESTS_INFO: {
			const contestsInfo = {};

			payload.forEach(contest => {
				contestsInfo[contest.address] = contest;
			});

			return {
				...state,
				contestsInfo,
			}
		}

		case ADD_BULK_CONTESTS_INFO: {
			const contestsInfo = { ...state.contestsInfo };

			payload.forEach(contest => {
				contestsInfo[contest.address] = contest;
			});

			return {
				...state,
				contestsInfo,
			}
		}

		case SET_SUBMISSIONS_INFO: {
			const { address, submissions } = payload;

			const submissionsInfo = { ...state.submissionsInfo };
			submissionsInfo[address] = submissions;

			return {
				...state,
				submissionsInfo,
			}
		}

		case SET_JURY_INFO: {
			const { address, juryStats } = payload;

			const jurorsInfo = { ...state.jurorsInfo };
			jurorsInfo[address] = juryStats;

			return {
				...state,
				jurorsInfo,
			}
		}

		case UPDATE_SUBMISSION_REWARD: {
			const { contestAddress, submissionId, reward } = payload;

			const newSubmissionsInfo = { ...state.submissionsInfo };
			const contestSubmissions = newSubmissionsInfo[contestAddress];
			const updatedContestSubmissions = contestSubmissions.map(subm => {
				if (subm.id === submissionId)
					return { ...subm, reward }
				
				return subm;
			});
			newSubmissionsInfo[contestAddress] = updatedContestSubmissions;

			return {
				...state,
				submissionsInfo: newSubmissionsInfo,
			}
		}

		case SET_REMOVED_JUROR: {
			const { address, juryAddr } = payload

			const removedJurorsForContest = [ ...(state.removedJurors[address] || []) ];

			removedJurorsForContest.push(juryAddr);

			const newRemovedJurors = {
				...state.removedJurors,
				[address]: removedJurorsForContest,
			};

			return {
				...state,
				removedJurors: newRemovedJurors,
			}
		}

		default:
			return state
	}
}

export default contestReducer
