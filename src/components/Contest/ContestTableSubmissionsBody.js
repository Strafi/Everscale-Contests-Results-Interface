import React, { memo } from 'react';

const ContestTableSubmissionsBody = memo(({ contestSubmissions }) => {
	let totalReward = 0;

	const submissionsToRender = contestSubmissions.map(submission => {
		if (typeof submission.reward === 'number' && !Number.isNaN(submission.reward))
			totalReward += submission.reward;

		const scoreToShow = submission.score.toFixed(2);

		return (
			<tr key={submission.participantAddress}>
				<td>{submission.place}</td>
				<td>{submission.reward}</td>
				<td>{submission.id}</td>
				<td>{scoreToShow}</td>
				<td>{submission.acceptAmount}</td>
				<td>{submission.rejectAmount}</td>
				<td>{submission.participantAddress}</td>
			</tr>
		)
	});

	if (!submissionsToRender.length)
		return (<div>no subm</div>)

	return (
		<tbody>
			{submissionsToRender}
			<tr>
				<td>Total</td>
				<td>{totalReward}</td>
			</tr>
		</tbody>
	)
})

export default ContestTableSubmissionsBody;
