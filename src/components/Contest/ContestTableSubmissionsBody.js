import React, { memo } from 'react';

const ContestTableSubmissionsBody = memo(({ contestSubmissions }) => {
	let totalReward = 0;

	const submissionsToRender = contestSubmissions.map(submission => {
		totalReward += submission.reward;

		return (
			<tr key={submission.participantAddress}>
				<td>{submission.place}</td>
				<td>{submission.reward}</td>
				<td>{submission.id}</td>
				<td>{submission.score}</td>
				<td>{submission.acceptAmount}</td>
				<td>{submission.rejectAmount}</td>
				<td>{submission.participantAddress}</td>
			</tr>
		)
	});

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
