import React from 'react';
import ContestHeaderControls from './ContestHeaderControls';

import './index.scss';

const ContestHeader = ({
	contestInfo, setJuryView, exportExcel, isJuryView, juryRewardPercent, setJuryRewardPercent, isControlsVisible
}) => {
	const now = Date.now();
	const isUnderway = now < contestInfo.contestDeadline * 1000;
	const isVoting = now > contestInfo.contestDeadline * 1000 && now < contestInfo.votingDeadline * 1000;
	const statusClassName = `contest-header__status ${isUnderway ? 'contest-header__status--underway' : ''} ${isVoting
		? 'contest-header__status--voting' : ''
	}`;
	const statusText = isUnderway ? '(Underway)' : isVoting ? '(Voting)' : '';

	return (
		<div className='contest-header'>
			<div className='contest-header__header'>Results <span className={statusClassName}>{statusText}</span></div>
			<a
				href={contestInfo.link}
				target='_blank'
				rel="noreferrer"
				className='contest-header__title'
			>
				{contestInfo.title}
			</a>
			{isControlsVisible
				&& <ContestHeaderControls
					setJuryView={setJuryView}
					exportExcel={exportExcel}
					setJuryRewardPercent={setJuryRewardPercent}
					isJuryView={isJuryView}
					juryRewardPercent={juryRewardPercent}
				/>
			}
		</div>
	)
}

export default ContestHeader;
