import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedSubgov } from 'src/store/actions/common';
import { OptionsList } from 'src/components';

const SubgovSwitcher = ({ governances, selectedGovernance }) => {
	const dispatch = useDispatch();

	const governancesToRender = governances
		.filter(gov => gov.name !== selectedGovernance.name)
		.map(gov => (
			<div
				className='options-list__list-item'
				onClick={() => dispatch(setSelectedSubgov(gov))}
				key={gov.name}
			>
				{gov.fullName}
			</div>
		));

	const selectedItem = `Subgov: ${selectedGovernance.fullName}`;

	return (
		<div className='subgov-switcher'>
			<div className='subgov-switcher__title'>Contests</div>
			<OptionsList selectedItem={selectedItem}>
				{governancesToRender}
			</OptionsList>
		</div>
	);
}

export default SubgovSwitcher;
