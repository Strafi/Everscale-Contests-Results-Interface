import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedSubgov } from 'src/store/actions/common';
import { ArrowIcon } from 'src/components/icons';

const SubgovSwitcher = ({ governances, selectedGovernance }) => {
	const switcherBlockRef = useRef(null);
	const [isListOpen, setIsListOpen] = useState(false);

	const handleClickOutside = useCallback(event => {
		if (!switcherBlockRef?.current?.contains(event.target) && isListOpen)
			setIsListOpen(false);
	}, [isListOpen]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		}
	}, [handleClickOutside]);

	const switcherBlockClassName = `subgov-switcher__switch-block ${isListOpen
		? 'subgov-switcher__switch-block--active' : ''
	}`

	const listGovernances = governances.filter(gov => gov.name !== selectedGovernance.name);

	return (
		<div className='subgov-switcher'>
			<div className='subgov-switcher__title'>Contests</div>
			<div
				ref={switcherBlockRef}
				onClick={() => setIsListOpen(!isListOpen)}
				className={switcherBlockClassName}
			>
				{`Subgov: ${selectedGovernance.fullName}`}
				<ArrowIcon />
				<SubgovList isListOpen={isListOpen} governances={listGovernances} />
			</div>
		</div>
	);
}

const SubgovList = ({ governances, isListOpen }) => {
	const dispatch = useDispatch();

	const governancesToRender = governances.map(gov => (
		<div
			className='subgov-switcher__list-item'
			onClick={() => dispatch(setSelectedSubgov(gov))}
			key={gov.name}
		>
			{gov.fullName}
		</div>
	))

	const listClassName = `subgov-switcher__list ${isListOpen
		? 'subgov-switcher__list--visible' : ''
	}`;

	return (
		<div className={listClassName}>
			{governancesToRender}
		</div>
	);
}

export default SubgovSwitcher;
