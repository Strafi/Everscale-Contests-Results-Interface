import { SORT_BY_VALUES_PARTICIPANTS } from 'src/constants';
import sortSubmissions from './sortSubmissions';
import parseRewards from './parseRewards';

function processSubmissionsInfo(initialSubmissionsInfo, contestRewards) {
	const submissions = initialSubmissionsInfo.map(submissionInfo => {
		const isRejected = submissionInfo.marks.length / submissionInfo.rejectAmount < 1;
		const newSubmInfo = { ...submissionInfo, isRejected };

		if (isRejected) {
			newSubmInfo.reward = 0;
			newSubmInfo.score = 0;
			newSubmInfo.isRejected = true;
		} else {
			const marksSum = newSubmInfo.marks.reduce((previousValue, currentValue) => {
				return previousValue + parseInt(currentValue, 10);
			}, 0);

			const score = marksSum / newSubmInfo.marks.length;
			const normalizedScore = score.toFixed(2);
			newSubmInfo.score = +normalizedScore;
		}

		newSubmInfo.acceptAmount = newSubmInfo.marks.length;

		return newSubmInfo;
	});

	const sortedSubmissions = sortSubmissions(submissions, SORT_BY_VALUES_PARTICIPANTS.SCORE);
	const submissionsWithFullInfo = getSubmissionsWithFullInfo(sortedSubmissions, contestRewards);

	return submissionsWithFullInfo;
}

function getSubmissionsWithFullInfo(sortedSubmissions, contestRewards) {
	const parsedRewards = parseRewards(contestRewards);
	const submissionsWithSameScore = {};
	let prevReward;

	const submissionsWithFullInfo = sortedSubmissions.map((subm, index, initialArray) => {
		const prevSubm = initialArray[index - 1];
		const place = index + 1;
		const reward = parsedRewards[place] || 0;

		if (prevSubm && prevSubm.score === subm.score && subm.score !== 0) {
			submissionsWithSameScore[index - 1] = prevReward;
			submissionsWithSameScore[index] = reward;
		}

		prevReward = reward;

		return {
			...subm,
			place,
			reward,
		}
	})

	let tempToCollectSequence = {}, prevSubmIndex;
	const lastSequenceIndex = +Object.keys(submissionsWithSameScore).pop();
	for (const submIndex in submissionsWithSameScore) {
		const numberSubmIndex = +submIndex;
		const isLastIndex = numberSubmIndex === lastSequenceIndex;
		const shouldCollectSequence = (!prevSubmIndex
			|| (
				prevSubmIndex + 1 === numberSubmIndex
				&& submissionsWithFullInfo[prevSubmIndex].score === submissionsWithFullInfo[numberSubmIndex].score
			))
			&& !isLastIndex

		if (shouldCollectSequence) {
			tempToCollectSequence[numberSubmIndex] = submissionsWithSameScore[numberSubmIndex];
		} else {
			if (isLastIndex)
				tempToCollectSequence[numberSubmIndex] = submissionsWithSameScore[numberSubmIndex];

			const rewardsForSequence = Object.values(tempToCollectSequence);
			const totalRewardForSequence = rewardsForSequence.reduce((previousValue, currentValue) => {
				return previousValue + currentValue;
			}, 0);

			const rewardForSubmInSequence = totalRewardForSequence / rewardsForSequence.length;

			for (const submSeqIndex in tempToCollectSequence) {
				submissionsWithFullInfo[submSeqIndex].reward = rewardForSubmInSequence;
			}

			tempToCollectSequence = {
				[numberSubmIndex]: submissionsWithSameScore[numberSubmIndex]
			};
		}

		prevSubmIndex = numberSubmIndex;
	}

	return submissionsWithFullInfo;
}

export default processSubmissionsInfo;
