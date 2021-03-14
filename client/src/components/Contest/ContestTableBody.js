import React from 'react';
import { createWalletUrl } from 'src/helpers';
import Td from './ContestTableTd';
import RewardInput from './RewardInput';
import { greenCellStyles, redCellStyles } from './styles';

const ContestTableBody = ({
	contestSubmissions, isJuryView, contestJury, juryRewardPercent, contestAddress
}) => {
	if (!contestSubmissions.length)
		return (<div>no subm</div>)

	let totalRewardForParticipants = 0;

	const submissionsToRender = contestSubmissions.map((submission, index) => {
		const hasReward = typeof submission.reward === 'number' && !Number.isNaN(submission.reward);
		if (hasReward && submission.reward > 0)
			totalRewardForParticipants += submission.reward;

		const scoreToShow = submission.score.toFixed(2);
		const isGrey = index === 0 || index % 2 === 0;
		const rowClassName = `contest-table__row ${isGrey
			? 'contest-table__row--grey' : ''
		} ${submission.isRejected ? 'contest-table__row--rejected' : ''}`;
		const walletUrl = createWalletUrl(submission.participantAddress);

		const shouldShowInput = !submission.isRejected && submission.reward === -1;

		return (
			<tr className={rowClassName} key={`${submission.participantAddress}${submission.id}`}>
				<Td>{submission.place}</Td>
				<Td>
					{shouldShowInput
						? <RewardInput
							contestAddress={contestAddress}
							submissionId={submission.id}
						/>
						: submission.reward
					}
				</Td>
				<Td>
					{submission.fileLink
						? <a href={submission.fileLink} target='_blank' rel="noreferrer">{submission.id}</a>
						: submission.id
					}
				</Td>
				<Td>{scoreToShow}</Td>
				<Td styles={greenCellStyles}>{submission.acceptAmount}</Td>
				<Td styles={redCellStyles}>{submission.rejectAmount}</Td>
				<Td className='contest-table__cell--wallet'>
					<a href={walletUrl} target='_blank' rel="noreferrer">{submission.participantAddress}</a>
				</Td>
			</tr>
		)
	});

	let collectionToRender;
	let totalAccept = 0, totalReject = 0, totalAbstain = 0, totalRewardForJury = 0;

	if (isJuryView) {
		const juryToRender = [];

		Object.values(contestJury).forEach(jury => {
			const {
				acceptAmount = 0,
				abstainAmount = 0,
				rejectAmount = 0,
			} = jury

			totalAccept += acceptAmount;
			totalReject += rejectAmount;
			totalAbstain += abstainAmount;
		});

		for (const juryAddr in contestJury) {
			const {
				acceptAmount = 0,
				abstainAmount = 0,
				rejectAmount = 0,
				id,
			} = contestJury[juryAddr];
			const juryVotes = acceptAmount + rejectAmount;
			let normalizedReward

			if (typeof juryRewardPercent === 'number' && !Number.isNaN(juryRewardPercent) && totalRewardForParticipants) {
				const reward = juryVotes / (totalAccept + totalReject) * totalRewardForParticipants * juryRewardPercent / 100;
				normalizedReward = +reward.toFixed(2);
				totalRewardForJury += normalizedReward;
			}
			
			const isGrey = juryToRender.length === 0 || juryToRender.length % 2 === 0;
			const rowClassName = `contest-table__row ${isGrey ? 'contest-table__row--grey' : ''}`;
			const walletUrl = createWalletUrl(juryAddr);

			juryToRender.push(
				<tr className={rowClassName} key={juryAddr}>
					<Td>{id}</Td>
					<Td>{normalizedReward}</Td>
					<Td>{juryVotes + abstainAmount}</Td>
					<Td styles={greenCellStyles}>{acceptAmount}</Td>
					<Td>{abstainAmount}</Td>
					<Td styles={redCellStyles}>{rejectAmount}</Td>
					<Td className='contest-table__cell--wallet'>
						<a href={walletUrl} target='_blank' rel="noreferrer">{juryAddr}</a>
					</Td>
				</tr>
			)
		}

		collectionToRender = juryToRender;
	} else {
		collectionToRender = submissionsToRender;
	}

	return (
		<tbody>
			{collectionToRender}
			<tr className='contest-table__row contest-table__row--total-row'>
				<Td>Total</Td>
				{
					isJuryView
					? <>
						<Td>{totalRewardForJury ? totalRewardForJury.toFixed(2) : ''}</Td>
						<Td>{totalAccept + totalReject + totalAbstain}</Td>
						<Td styles={greenCellStyles}>{totalAccept}</Td>
						<Td>{totalAbstain}</Td>
						<Td styles={redCellStyles}>{totalReject}</Td>
						<Td />
					</>
					: <>
						<Td>{totalRewardForParticipants || ''}</Td>
						<Td />
						<Td />
						<Td />
						<Td />
						<Td />
					</>
				}
			</tr>
		</tbody>
	)
}

export default ContestTableBody;
