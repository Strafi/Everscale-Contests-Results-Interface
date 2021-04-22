import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowIcon } from 'src/components/icons';
import './index.scss';

const OptionsList = ({ children, selectedItem, height }) => {
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

	const listClassName = `options-list__list ${isListOpen
		? 'options-list__list--visible' : ''
	}`;

	const switcherBlockClassName = `options-list ${isListOpen
		? 'options-list--active' : ''
	}`;

	return (
		<div
			ref={switcherBlockRef}
			onClick={() => setIsListOpen(!isListOpen)}
			className={switcherBlockClassName}
		>
			{selectedItem}
			<ArrowIcon />
			<div
				className={listClassName}
				style={{ '--height': height ? `${height}px` : '252px' }}
			>
				{children}
			</div>
		</div>
	);
}

export default OptionsList;
