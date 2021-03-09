const REWARDS_RANGE_SEPARATOR = '-';

function parseRewards(rewards) {
	const parsedRewards = {};

	if (!rewards)
		return parsedRewards;

	try {
		for (const rewardsRange in rewards) {
			const [rangeStart, rangeEnd] = rewardsRange.split(REWARDS_RANGE_SEPARATOR);

			if (rangeEnd) {
				const rangeStartNum = parseInt(rangeStart, 10);
				const rangeEndNum = parseInt(rangeEnd, 10);

				for (let i = rangeStartNum; i <= rangeEndNum; i++) {
					parsedRewards[i] = rewards[rewardsRange];
				}
			} else {
				parsedRewards[rangeStart] = rewards[rangeStart];
			}
		}

		return parsedRewards;
	} catch(err) {
		console.error('Error while parsing rewards: ', err);

		return parsedRewards;
	}
}

export default parseRewards;
