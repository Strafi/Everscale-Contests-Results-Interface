import {
	SET_CONTEST_INFO,
	SET_BULK_CONTESTS_INFO,
	SET_SUBMISSIONS_INFO,
} from '../actions/contest';

const initialState = {
	contestsInfo: new Map(),
	submissionsInfo: new Map(),
}
  
function contestReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_CONTEST_INFO: {
			const contestsInfo = new Map(state.contestsInfo);
			contestsInfo.set(payload.address, payload);

			return {
				...state,
				contestsInfo,
			}
		}

		case SET_BULK_CONTESTS_INFO: {
			const contestsInfo = new Map(state.contestsInfo);

			payload.forEach(contest => {
				contestsInfo.set(contest.address, contest);
			});

			return {
				...state,
				contestsInfo,
			}
		}

		case SET_SUBMISSIONS_INFO: {
			const submissionsInfo = new Map(state.submissionsInfo);
			submissionsInfo.set(payload.address, payload.submissions);

			return {
				...state,
				submissionsInfo,
			}
		}

		default:
			return state
	}
}

export default contestReducer