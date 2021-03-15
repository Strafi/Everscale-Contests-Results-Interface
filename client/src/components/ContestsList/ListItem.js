import React from 'react';
import { Link } from 'react-router-dom';
import { getUTCDate, createContestUrl } from 'src/helpers';

const getDatePartToShow = contest => {
	const now = Date.now();
	const isUnderway = now < contest.contestDeadline * 1000;
	const isVoting = now > contest.contestDeadline * 1000 && now < contest.votingDeadline * 1000;
	const contestDateToOperate = isUnderway
		? getUTCDate(new Date(contest.contestDeadline * 1000))
		: getUTCDate(new Date(contest.votingDeadline * 1000));

	const endedAtStr = contestDateToOperate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
	const yearStr = contestDateToOperate.toLocaleDateString('en-US', { year: 'numeric' });
	const timeStr = contestDateToOperate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

	if (isUnderway) {
		return (<><span className='contests-list__item-date--underway'>Underway</span> until {endedAtStr}, {yearStr}, {timeStr} UTC</>)
	}

	if (isVoting) {
		return (<><span className='contests-list__item-date--voting'>Voting</span> until {endedAtStr}, {yearStr}, {timeStr} UTC</>)
	}

	return (<><span className='contests-list__item-date--ended'>Ended</span> {endedAtStr}, {yearStr}, {timeStr} UTC</>)
}

const ListItem = ({ contest, isGrey }) => {
	const datePart = getDatePartToShow(contest);
	const linkAddress = createContestUrl(contest.address);
	const listItemClassName = `contests-list__item ${isGrey ? 'contests-list__item--grey' : ''}`;

	return (
		<Link to={linkAddress} className={listItemClassName}>
			<div className='contests-list__item-title'>
				{contest.title}
			</div>
			<div className='contests-list__item-date'>
				{datePart}
			</div>
		</Link>
	);
}

export default ListItem;
