import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import './index.scss';

class Header extends Component {
	render() {
		return (
			<header className='header-container'>
				<h1>Free TON Contests Results</h1>
				<SearchBar />
				<div className='header-container__address-explanation'>
					Where to find contest address?
				</div>
			</header>
		);
	}
}

export default Header;
