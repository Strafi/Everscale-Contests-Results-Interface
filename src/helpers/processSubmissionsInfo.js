import { SORT_BY_VALUES } from 'src/constants';
import sortSubmissions from './sortSubmissions';
import parseRewards from './parseRewards';

function processSubmissionsInfo(initialSubmissionsInfo, contestRewards) {
	const submissions = initialSubmissionsInfo.map(submissionInfo => {
		const isRejected = submissionInfo.marks.length / submissionInfo.rejectAmount < 1;
		const newSubmInfo = { ...submissionInfo, isRejected };

		if (isRejected) {
			newSubmInfo.reward = 0;
			newSubmInfo.score = 0;
		} else {
			const marksSum = newSubmInfo.marks.reduce((previousValue, currentValue) => {
				return previousValue + parseInt(currentValue, 10);
			}, 0);

			newSubmInfo.score = marksSum / newSubmInfo.marks.length;
		}

		newSubmInfo.acceptAmount = newSubmInfo.marks.length;

		return newSubmInfo;
	});

	const sortedSubmissions = sortSubmissions(submissions, SORT_BY_VALUES.SCORE);
	const parsedRewards = parseRewards(contestRewards);
	const submissionsWithFullInfo = sortedSubmissions.map((subm, index, initialArray) => {
		// const prevSubm = initialArray[index - 1];
		const place = index + 1;
		const reward = parsedRewards[place];

		return {
			...subm,
			place,
			reward,
		}
	})

	return submissionsWithFullInfo;
}

export default processSubmissionsInfo;
