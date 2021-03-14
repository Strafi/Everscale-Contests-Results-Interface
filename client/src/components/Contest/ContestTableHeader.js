import React from 'react';
import Th from './ContestTableTh';
import { hiddenTitleStyles } from './styles';
import { SORT_BY_VALUES_PARTICIPANTS, SORT_BY_VALUES_JURY } from 'src/constants';
import { ArrowIcon } from 'src/components/icons';

const ContestTableHeader = ({
	contestInfo, isJuryView, submissionsSortParams, jurySortParams, sortSubmissions, sortJury
}) => {
	const { title } = contestInfo;

	return (
		<thead className='contest-table__header'>
			<tr className='contest-table__header-hidden-line'><th colSpan='7'/></tr>
			<tr className='contest-table__header-hidden-line'>
				<th colSpan='7' style={hiddenTitleStyles}><a href={contestInfo.link}>{title}</a></th>
			</tr>
			{
				isJuryView
					? <TableHeaderForJury
						jurySortParams={jurySortParams}
						sortJury={sortJury}
					/>
					: <TableHeaderForParticipants
						submissionsSortParams={submissionsSortParams}
						sortSubmissions={sortSubmissions}
					/>
			}
		</thead>
	)
}

const TableHeaderForParticipants = ({ submissionsSortParams, sortSubmissions }) => {
	const { field, isAskending } = submissionsSortParams;
	const placeClassName = `${field === SORT_BY_VALUES_PARTICIPANTS.PLACE ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`;
	const submissionClassName = `${field === SORT_BY_VALUES_PARTICIPANTS.SUBMISSION_ID ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`;
	const acceptedClassName = `${field === SORT_BY_VALUES_PARTICIPANTS.ACCEPTED ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`
	const rejectedClassName = `${field === SORT_BY_VALUES_PARTICIPANTS.REJECTED ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`

	return (
		<tr className='contest-table__row'>
			<Th 
				className={placeClassName}
				onClick={() => sortSubmissions(SORT_BY_VALUES_PARTICIPANTS.PLACE)}
			>
				Place
				<ArrowIcon />
			</Th>
			<Th>Reward</Th>
			<Th
				className={submissionClassName}
				onClick={() => sortSubmissions(SORT_BY_VALUES_PARTICIPANTS.SUBMISSION_ID)}
			>
				Submission №
				<ArrowIcon />
			</Th>
			<Th>Avg. Score</Th>
			<Th
				className={acceptedClassName}
				onClick={() => sortSubmissions(SORT_BY_VALUES_PARTICIPANTS.ACCEPTED)}
			>
				Accepted
				<ArrowIcon />
			</Th>
			<Th
				className={rejectedClassName}
				onClick={() => sortSubmissions(SORT_BY_VALUES_PARTICIPANTS.REJECTED)}
			>
				Rejected
				<ArrowIcon />
			</Th>
			<Th className='contest-table__cell--wallet'>Wallet</Th>
		</tr>
	)
};

const TableHeaderForJury = ({ jurySortParams, sortJury }) => {
	const { field, isAskending } = jurySortParams;
	const idClassName = `${field === SORT_BY_VALUES_JURY.JURY_ID ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`;
	const votesCountClassName = `${field === SORT_BY_VALUES_JURY.TOTAL_VOTES ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`;
	const acceptedClassName = `${field === SORT_BY_VALUES_JURY.ACCEPTED ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`
	const abstainedClassName = `${field === SORT_BY_VALUES_JURY.ABSTAINED ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`
	const rejectedClassName = `${field === SORT_BY_VALUES_JURY.REJECTED ? `contest-table__cell--active ${
		isAskending ? 'contest-table__cell--askending' : ''
	}` : 'contest-table__cell--selectable'}`

	return (
		<tr className='contest-table__row'>
			<Th
				className={idClassName}
				onClick={() => sortJury(SORT_BY_VALUES_JURY.JURY_ID)}
			>
				Jury №
				<ArrowIcon />
			</Th>
			<Th>Reward</Th>
			<Th
				className={votesCountClassName}
				onClick={() => sortJury(SORT_BY_VALUES_JURY.TOTAL_VOTES)}
			>
				Votes Count
				<ArrowIcon />
			</Th>
			<Th
				className={acceptedClassName}
				onClick={() => sortJury(SORT_BY_VALUES_JURY.ACCEPTED)}
			>
				Accepted
				<ArrowIcon />
			</Th>
			<Th
				className={abstainedClassName}
				onClick={() => sortJury(SORT_BY_VALUES_JURY.ABSTAINED)}
			>
				Abstained
				<ArrowIcon />
			</Th>
			<Th
				className={rejectedClassName}
				onClick={() => sortJury(SORT_BY_VALUES_JURY.REJECTED)}
			>
				Rejected
				<ArrowIcon />
			</Th>
			<Th className='contest-table__cell--wallet'>Wallet</Th>
		</tr>
	)
}

export default ContestTableHeader;
