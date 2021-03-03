import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { TonApi, DatabaseApi } from 'api';
import App from 'components/App';

require('dotenv').config();

TonApi.init();
DatabaseApi.init();

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root'),
);
