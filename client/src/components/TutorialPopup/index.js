import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setIsTutorialActive } from 'src/store/actions/common';
import { MAIN_GOV_LINK } from 'src/constants';
import { CancelIcon } from 'src/components/icons';
import './index.scss';

const TutorialPopup = () => {
	const wrapperRef = useRef(null);
	const dispatch = useDispatch();

	const handleClickOutside = e => {
		if (wrapperRef && e.target === wrapperRef.current) {
			dispatch(setIsTutorialActive(false));
		}
	}

	return (
		<div ref={wrapperRef} className='tutorial-popup' onClick={handleClickOutside}>
			<div className='tutorial-popup__container'>
				<CancelIcon onClick={() => dispatch(setIsTutorialActive(false))} />
				<div className='tutorial-popup__header'>
					Where to find contest address?
				</div>
				<ol>
					<li className='tutorial-popup__list-item'>
						Go to <a href={MAIN_GOV_LINK} target='_blank' rel="noreferrer">https://gov.freeton.org</a>
					</li>
					<li className='tutorial-popup__list-item'>
						Find a contest you want to check
					</li>
					<li className='tutorial-popup__list-item'>
						Click here to copy the contest address
						<img src='/tutorial-1.jpg' alt='' />
					</li>
					<li className='tutorial-popup__list-item' style={{ marginBottom: 0 }}>
						Paste contest address into the search bar
						<img src='/tutorial-2.jpg' alt='' />
					</li>
					<li className='tutorial-popup__list-item'>
						Hit Enter or click on the search icon
					</li>
					<li className='tutorial-popup__list-item'>
						Great! You are amazing!
					</li>
				</ol>
			</div>
		</div>
	);
}

export default TutorialPopup;
