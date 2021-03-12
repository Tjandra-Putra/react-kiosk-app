import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import reducer from './store/reducer';

// Takes reducer as an input
const store = createStore(reducer);

// Subscription
store.subscribe(() => {
	console.log('[Subscription]', store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
