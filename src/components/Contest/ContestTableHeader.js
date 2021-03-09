import React from 'react';

const ContestTableHeader = ({ contestInfo }) => {
	return (
		<thead>
			<tr><th colSpan='7'/></tr>
			<tr>
				<th colSpan='7' style={{ fontSize: '26px' }}><a href={contestInfo.link}>{contestInfo.title}</a></th>
			</tr>
			<tr>
				<th>Place</th>
				<th>Reward</th>
				<th>Submission №</th>
				<th>Avg. Score</th>
				<th>Accepted</th>
				<th>Rejected</th>
				<th>Wallet</th>
			</tr>
		</thead>
	)
}

export default ContestTableHeader;
