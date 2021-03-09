import React from 'react';
import { Link } from 'react-router-dom';
import { getUTCDate, createContestUrl } from 'src/helpers';

const ListItem = ({ contest }) => {
	const date = getUTCDate(new Date(contest.contestDeadline * 1000)).toDateString();
	const linkAddress = createContestUrl(contest.address);

	return (
		<Link to={linkAddress} className='contests-list__item'>
			<div className='contest-list__item-title'>
				{contest.title}
			</div>
			<div className='contest-list__item-date'>
				{date}
			</div>
			<div className='contest-list__item-address'>
				{contest.address}
			</div>
		</Link>
	);
}

export default ListItem;
