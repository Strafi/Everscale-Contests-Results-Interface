import React from 'react';
import './index.scss';

const Loader = () => {
	return (
		<div className='loader'>
			<img className='loader__cat' src='/loader.gif' alt='Loading...' />
		</div>
	);
}

export default Loader;
