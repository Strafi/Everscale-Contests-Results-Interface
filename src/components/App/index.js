/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header, ContestsList, Contest } from 'components';

import './index.scss';

class App extends Component {
	render() {
		return (
			<div className='app-container'>
				<Header />
				<Switch>
					<Route exact path='/' component={ContestsList} />
					<Route path='contest' component={Contest} />
				</Switch>
			</div>
		);
	}
}

export default App;
