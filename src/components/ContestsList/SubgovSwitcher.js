import React, { Component } from 'react';
import { ArrowIcon } from 'src/components/icons';

class SubgovSwitcher extends Component {
	render() {
		return (
			<div className='subgov-switcher'>
				<div className='subgov-switcher__title'>Contests</div>
				<div className='subgov-switcher__switch-block'>
					Subgov: Main
					<ArrowIcon />
				</div>
			</div>
		);
	}
}

export default SubgovSwitcher;
