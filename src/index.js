import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';
import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style/index.css';

const target = document.querySelector('#app');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();
