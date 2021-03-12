import React from 'react';

import './index.scss';

const ContestHeader = ({
	contestInfo, setJuryView, exportExcel, isJuryView
}) => {
	const participantsButtonClassName = `contest-header__participants-view-button ${isJuryView
		? '' : 'contest-header__participants-view-button--active'
	}`;
	const juryButtonClassName = `contest-header__jury-view-button ${isJuryView
		? 'contest-header__jury-view-button--active' : ''
	}`;

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
			<div className='contest-header__controls'>
				<div className='contest-header__view-switcher'>
					<div onClick={() => setJuryView(false)} className={participantsButtonClassName}>
						Participants
					</div>
					<div onClick={() => setJuryView(true)} className={juryButtonClassName}>
						Jury
					</div>
				</div>
				<div onClick={exportExcel} className='contest-header__export-button'>
					Export to .xlsx
				</div>
			</div>
		</div>
	)
}

export default ContestHeader;
