import { SORT_BY_VALUES_JURY } from 'src/constants';

function sortJury(jurors, sortBy = SORT_BY_VALUES_JURY.DEFAULT, isAskending = false) {
	const juryToSort = [];

	for (const juryAddr in jurors) {
		const {
			acceptAmount = 0,
			abstainAmount = 0,
			rejectAmount = 0,
			id,
		} = jurors[juryAddr];
		const totalVotes = acceptAmount + rejectAmount + abstainAmount;

		juryToSort.push({
			address: juryAddr,
			acceptAmount,
			abstainAmount,
			rejectAmount,
			totalVotes,
			id,
		})
	}

	const sortedJury = juryToSort.sort((a, b) => {
		let firstEl = a[sortBy], secondEl = b[sortBy];

		if (typeof firstEl === 'string')
			firstEl = parseInt(firstEl, 10);

		if (typeof secondEl === 'string')
			secondEl = parseInt(secondEl, 10);

		const compared = isAskending ? firstEl - secondEl : secondEl - firstEl;

		return compared;
	})

	const normalizedJury = sortedJury.reduce((acc, jury) => {
		const  { 
			address,
			acceptAmount,
			abstainAmount,
			rejectAmount,
			id,
		 } = jury;
		return {
			...acc,
			[address]: {
				acceptAmount,
				abstainAmount,
				rejectAmount,
				id,
			}
		}
	}, {});

	return normalizedJury;
}

export default sortJury;
