function prepareSubmissions(contestSubmissions) {
	return contestSubmissions.map(subm => ({
		place: subm.place,
		reward: subm.reward === -1 ? 0 : subm.reward,
		id: subm.id,
		score: subm.score,
		acceptAmount: subm.acceptAmount,
		rejectAmount: subm.rejectAmount,
		address: subm.participantAddress,
		link: subm.fileLink,
	}));
}

function prepareJury(contestJury) {
	const jury = [];

	for (const juryAddr in contestJury) {
		const {
			acceptAmount = 0,
			abstainAmount = 0,
			rejectAmount = 0,
			id,
		} = contestJury[juryAddr];
		const totalVotes = acceptAmount + rejectAmount + abstainAmount;

		jury.push({
			id,
			totalVotes,
			acceptAmount,
			abstainAmount,
			rejectAmount,
			address: juryAddr,
		})
	}

	return jury;
}

async function exportToExcel(contestInfo, contestSubmissions, contestJury, juryRewardPercent) {
	const submissions = prepareSubmissions(contestSubmissions);
	const jury = prepareJury(contestJury);

	const infoToStringify = {
		title: contestInfo.title,
		link: contestInfo.link,
		submissions,
		jury,
		juryRewardPercent,
	}

	const infoToSend = JSON.stringify(infoToStringify);

	const res = await fetch('/api/v1/export-excel', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: infoToSend,
	});

	const blob = await res.blob();

	const downloadTable = url => {
		const link = document.createElement('a');
		link.download = `${infoToStringify.title}.xlsx`;
		link.href = url;
		link.click();
	};

	downloadTable(URL.createObjectURL(blob));
}

export default exportToExcel;