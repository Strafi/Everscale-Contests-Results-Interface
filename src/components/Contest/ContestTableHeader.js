import React from 'react';
import Th from './ContestTableTh';
import { hiddenTitleStyles } from './styles';

const ContestTableHeader = ({
	contestInfo, isJuryView
}) => {
	const { title } = contestInfo;

	const TableHeaderComponent = isJuryView
		? TableHeaderForJury
		: TableHeaderForParticipants;

	return (
		<thead className='contest-table__header'>
			<tr className='contest-table__header-hidden-line'><th colSpan='7'/></tr>
			<tr className='contest-table__header-hidden-line'>
				<th colSpan='7' style={hiddenTitleStyles}><a href={contestInfo.link}>{title}</a></th>
			</tr>
			<TableHeaderComponent />
		</thead>
	)
}

const TableHeaderForParticipants = () => (
	<tr className='contest-table__row'>
		<Th>Place</Th>
		<Th>Reward</Th>
		<Th>Submission №</Th>
		<Th>Avg. Score</Th>
		<Th>Accepted</Th>
		<Th>Rejected</Th>
		<Th className='contest-table__cell--wallet'>Wallet</Th>
	</tr>
);

const TableHeaderForJury = () => (
	<tr className='contest-table__row'>
		<Th>Jury №</Th>
		<Th>Reward</Th>
		<Th>Votes Count</Th>
		<Th>Accepted</Th>
		<Th>Abstained</Th>
		<Th>Rejected</Th>
		<Th className='contest-table__cell--wallet'>Wallet</Th>
	</tr>
)

export default ContestTableHeader;
