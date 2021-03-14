import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { BackIcon } from 'src/components/icons';
import SearchBar from '../SearchBar';
import './index.scss';

const Header = () => {
	const match = useRouteMatch('/contest');

	return (
		<header className='header-container'>
			<Link to='/'><h1>Free TON Contests Results</h1></Link>
			{match
				&& <Link to='/' className='header-container__back-button'>
					<BackIcon />
					<p>Back</p>
				</Link>
			}
			<SearchBar />
			<div className='header-container__address-explanation'>
				Where to find contest address?
			</div>
		</header>
	);
}

export default Header;
