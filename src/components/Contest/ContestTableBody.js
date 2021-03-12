import React, { memo } from 'react';
import { createWalletUrl } from 'src/helpers';
import Td from './ContestTableTd';
import { greenCellStyles, redCellStyles } from './styles';

const ContestTableBody = memo(({ contestSubmissions, isJuryView, contestJury, juryRewardPercent }) => {
	let totalRewardForParticipants = 0;

	const submissionsToRender = contestSubmissions.map((submission, index) => {
		if (typeof submission.reward === 'number' && !Number.isNaN(submission.reward))
			totalRewardForParticipants += submission.reward;

		const scoreToShow = submission.score.toFixed(2);
		const isGrey = index === 0 || index % 2 === 0;
		const rowClassName = `contest-table__row ${isGrey ? 'contest-table__row--grey' : ''}`;
		const walletUrl = createWalletUrl(submission.participantAddress);

		return (
			<tr className={rowClassName} key={submission.participantAddress}>
				<Td>{submission.place}</Td>
				<Td>{submission.reward}</Td>
				<Td>{submission.id}</Td>
				<Td>{scoreToShow}</Td>
				<Td styles={greenCellStyles}>{submission.acceptAmount}</Td>
				<Td styles={redCellStyles}>{submission.rejectAmount}</Td>
				<Td className='contest-table__cell--wallet'>
					<a href={walletUrl} target='_blank' rel="noreferrer">{submission.participantAddress}</a>
				</Td>
			</tr>
		)
	});

	const juryToRender = [];

	for (const juryAddr in contestJury) {
		const {
			acceptAmount = 0,
			abstainAmount = 0,
			rejectAmount = 0,
			id,
		} = contestJury[juryAddr];
		const totalVotes = acceptAmount + abstainAmount + rejectAmount;
		const reward = (totalVotes - abstainAmount)
		const isGrey = juryToRender.length === 0 || juryToRender.length % 2 === 0;
		const rowClassName = `contest-table__row ${isGrey ? 'contest-table__row--grey' : ''}`;
		const walletUrl = createWalletUrl(juryAddr);

		juryToRender.push(
			<tr className={rowClassName} key={juryAddr}>
				<Td>{id}</Td>
				<Td>{'reward'}</Td>
				<Td>{totalVotes}</Td>
				<Td styles={greenCellStyles}>{acceptAmount}</Td>
				<Td>{abstainAmount}</Td>
				<Td styles={redCellStyles}>{rejectAmount}</Td>
				<Td className='contest-table__cell--wallet'>
					<a href={walletUrl} target='_blank' rel="noreferrer">{juryAddr}</a>
				</Td>
			</tr>
		)
	}

	const collectionToRender = isJuryView
		? juryToRender
		: submissionsToRender;

	if (!collectionToRender.length)
		return (<div>no subm</div>)

	return (
		<tbody>
			{collectionToRender}
			<tr className='contest-table__row contest-table__row--total-row'>
				<Td>Total</Td>
				<Td>{totalRewardForParticipants}</Td>
				<Td />
				<Td />
				<Td />
				<Td />
				<Td />
			</tr>
		</tbody>
	)
})

export default ContestTableBody;
