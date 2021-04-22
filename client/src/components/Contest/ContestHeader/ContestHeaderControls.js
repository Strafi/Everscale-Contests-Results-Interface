import React from 'react';
import { CheckedIcon } from 'src/components/icons';

const ContestHeaderControls = ({
	setJuryView, exportExcel, isJuryView, juryRewardPercent, setJuryRewardPercent
}) => {
	const handleInputChange = event => {
		if (!event.target.value)
			return setJuryRewardPercent(undefined);

		const percent = +event.target.value;

		if (percent && !Number.isNaN(percent)) {
			setJuryRewardPercent(percent);
		}
	}

	const isInputFilled = typeof juryRewardPercent === 'number' && !Number.isNaN(juryRewardPercent);

	const participantsButtonClassName = `contest-header__participants-view-button ${isJuryView
		? '' : 'contest-header__participants-view-button--active'
	}`;
	const juryButtonClassName = `contest-header__jury-view-button ${isJuryView
		? 'contest-header__jury-view-button--active' : ''
	}`;
	const juryRewardInputClassName = `contest-header__reward-input-container ${isInputFilled
		? 'contest-header__reward-input-container--filled' : ''
	}`


	return (
		<div className='contest-header__controls contest-header__controls--center'>
			<div className='contest-header__view-switcher'>
				<div onClick={() => setJuryView(false)} className={participantsButtonClassName}>
					Participants
				</div>
				<div onClick={() => setJuryView(true)} className={juryButtonClassName}>
					Jury
				</div>
			</div>
			{isJuryView
				&& <div className={juryRewardInputClassName}>
					<input
						className='contest-header__reward-input'
						type='text'
						placeholder='Enter jury reward %'
						value={juryRewardPercent}
						onChange={handleInputChange}
					/>
					<CheckedIcon />
				</div>
			}
			<div onClick={exportExcel} className='contest-header__export-button'>
				Export to .xlsx
			</div>
		</div>
	)
}

export default ContestHeaderControls;
