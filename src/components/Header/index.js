/* eslint-disable camelcase */
import React, { Component } from 'react';

import { TonApi } from 'api';
import SearchBar from '../SearchBar';

import './index.scss';

const contestAddress = '0:3768aca93c0bdb6f8716c582f852d155c5ab64ef0b3ab7d46ebd6a22e26845b6';

class Header extends Component {
	doSmth = async () => {
		const res = await TonApi.getContestSubmissions(contestAddress);

		console.log('RES: ', res);
	}

	render() {
		return (
			<header className='header-container'>
				<h1 onClick={this.doSmth}>Free TON Contests Results</h1>
				<SearchBar />
			</header>
		);
	}
}

export default Header;
