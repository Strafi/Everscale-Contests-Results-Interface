import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import './index.scss';

class Header extends Component {
	render() {
		return (
			<header className='header-container'>
				<h1>Free TON Contests Results</h1>
				<SearchBar />
			</header>
		);
	}
}

export default Header;
