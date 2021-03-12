import React from 'react';
import { Link } from 'react-router-dom';
import { getUTCDate, createContestUrl } from 'src/helpers';

const ListItem = ({ contest, isGrey }) => {
	const date = getUTCDate(new Date(contest.contestDeadline * 1000)).toDateString();
	const linkAddress = createContestUrl(contest.address);
	const listItemClassName = `contests-list__item ${isGrey ? 'contests-list__item--grey' : ''}`;

	return (
		<div to={linkAddress} className={listItemClassName}>
			<Link to={linkAddress} className='contests-list__item-title'>
				{contest.title}
			</Link>
			<div className='contests-list__item-date'>
				{date}
			</div>
		</div>
	);
}

export default ListItem;
