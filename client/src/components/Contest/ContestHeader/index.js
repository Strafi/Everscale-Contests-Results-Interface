import React from 'react';

import ContestHeaderControls from './ContestHeaderControls';
import { OptionsList } from 'src/components';
import './index.scss';

const ContestHeader = ({
	contestInfo,
	setJuryView,
	exportExcel,
	isJuryView,
	juryRewardPercent,
	setJuryRewardPercent,
	isControlsVisible,
	isCountRejectAsZero,
	setIsCountRejectAsZero,
	threshold,
	setThreshold,
}) => {
	const now = Date.now();
	const isUnderway = now < contestInfo.contestDeadline * 1000;
	const isVoting = now > contestInfo.contestDeadline * 1000 && now < contestInfo.votingDeadline * 1000;
	const statusClassName = `contest-header__status ${isUnderway ? 'contest-header__status--underway' : ''} ${isVoting
		? 'contest-header__status--voting' : ''
	}`;
	const statusText = isUnderway ? '(Underway)' : isVoting ? '(Voting)' : '';

	const handleThresholdChange = threshold => {
		if (!threshold)
			return setThreshold(undefined);

		const normalizedThreshold = +threshold;

		if (!Number.isNaN(normalizedThreshold)
			&& normalizedThreshold >= 0
			&& normalizedThreshold <= 10
		)
			setThreshold(normalizedThreshold);
	}

	return (
		<div className='contest-header'>
			<div className='contest-header__controls'>
				<div>
					<div className='contest-header__header'>Results <span className={statusClassName}>{statusText}</span></div>
					<a
						href={contestInfo.link}
						target='_blank'
						rel="noreferrer"
						className='contest-header__title'
					>
						{contestInfo.title}
					</a>
				</div>
				<OptionsList height={90} selectedItem='Options'>
					<div className='contest-header__options-list-item'>
						<input
							value={isCountRejectAsZero}
							onChange={e => setIsCountRejectAsZero(e.target.checked)}
							type="checkbox"
							id="cbcountzero"
						/>
						<label htmlFor="cbcountzero">Count "Reject" as 0</label>
					</div>
					<div className='contest-header__options-list-item'>
						<input
							value={threshold}
							onChange={e => handleThresholdChange(e.target.value)}
							type="number"
							id="thresholdinput"
							className='contest-header__threshold-input'
						/>
						<label htmlFor="thresholdinput">Threshold</label>
					</div>
				</OptionsList>
			</div>
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
