import React from 'react';
import ContestHeaderControls from './ContestHeaderControls';

import './index.scss';

const ContestHeader = ({
	contestInfo, setJuryView, exportExcel, isJuryView, juryRewardPercent, setJuryRewardPercent, isControlsVisible
}) => {
	return (
		<div className='contest-header'>
			<div className='contest-header__header'>Results</div>
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
