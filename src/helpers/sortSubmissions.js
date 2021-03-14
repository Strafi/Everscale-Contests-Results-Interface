import { SORT_BY_VALUES_PARTICIPANTS } from 'src/constants';

function sortSubmissions(submission, sortBy = SORT_BY_VALUES_PARTICIPANTS.DEFAULT, isAskending = false) {
	const sortedSubmissions = submission.sort((a, b) => {
		let firstEl = a[sortBy], secondEl = b[sortBy];

		if (typeof firstEl === 'string')
			firstEl = parseInt(firstEl, 10);

		if (typeof secondEl === 'string')
			secondEl = parseInt(secondEl, 10);

		const compared = isAskending ? firstEl - secondEl : secondEl - firstEl;

		return compared;
	})

	return sortedSubmissions;
}

export default sortSubmissions;
