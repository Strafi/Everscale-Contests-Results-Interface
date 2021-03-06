import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Header, ContestsList, Contest, TutorialPopup } from 'src/components';
import './index.scss';

const App = () => {
	const isTutorialActive = useSelector(state => state.common.isTutorialActive);
	const appContainerClassName = `app-container ${isTutorialActive ? 'app-container--scroll-disabled' : ''}`;

	return (
		<div className={appContainerClassName}>
			<div className='app-container__flex-wrapper'>
				<Header />
				<Switch>
					<Route exact path='/' component={ContestsList} />
					<Route path='/contest' component={Contest} />
				</Switch>
				{isTutorialActive && <TutorialPopup />}
			</div>
		</div>
	);
}

export default App;
