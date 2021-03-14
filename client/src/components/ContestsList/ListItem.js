import React from 'react';
import { Link } from 'react-router-dom';
import { getUTCDate, createContestUrl } from 'src/helpers';

const ListItem = ({ contest, isGrey }) => {
	const date = getUTCDate(new Date(contest.contestDeadline * 1000)).toDateString();
	const linkAddress = createContestUrl(contest.address);
	const listItemClassName = `contests-list__item ${isGrey ? 'contests-list__item--grey' : ''}`;

	return (
		<Link to={linkAddress} className={listItemClassName}>
			<div className='contests-list__item-title'>
				{contest.title}
			</div>
			<div className='contests-list__item-date'>
				{date}
			</div>
		</Link>
	);
}

export default ListItem;
