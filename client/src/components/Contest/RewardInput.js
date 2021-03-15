import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubmissionReward } from 'src/store/actions/contest';

const RewardInput = ({ contestAddress, submissionId }) => {
	const [reward, setReward] = useState();
	const dispatch = useDispatch();

	const handleInputChange = event => {
		if (!event.target.value)
			return setReward(undefined);

		const reward = +event.target.value;

		if (reward && !Number.isNaN(reward)) {
			setReward(reward);
		}
	}

	const updateRewardForSubmission = () => {
		if (reward) {
			dispatch(updateSubmissionReward({
				contestAddress,
				submissionId,
				reward
			}))
		}
	}

	const handleKeyPress = event => {
		const { shiftKey, key, altKey } = event;
		const isEnter = key === 'Enter';
		const shouldSetReward = isEnter && !shiftKey && !altKey;

		if (shouldSetReward) {
			event.preventDefault();
			updateRewardForSubmission();
		}
	}

	return (
		<input
			className='contest-table__reward-input'
			type='text'
			placeholder='Enter reward'
			value={reward}
			onChange={handleInputChange}
			onBlur={updateRewardForSubmission}
			onKeyPress={handleKeyPress}
		/>
	)
}

export default RewardInput
