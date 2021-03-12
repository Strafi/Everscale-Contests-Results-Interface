import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, ContestsList, Contest } from 'src/components';
import './index.scss';

class App extends Component {
	render() {
		return (
			<div className='app-container'>
				<div className='app-container__flex-wrapper'>
					<Header />
					<Switch>
						<Route exact path='/' component={ContestsList} />
						<Route path='/contest' component={Contest} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
