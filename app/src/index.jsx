import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { composeWithDevTools } from 'redux-devtools-extension';
// Prueba de si funciona el push
// import { addLocaleData } from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import es from 'react-intl/locale-data/es';
/* Styles + Icons + Fonts */
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'simple-line-icons/css/simple-line-icons.css';
import '../node_modules/react-table/react-table.css';
import './style.css';
/* Local Imports */
import registerServiceWorker from './configs/registerServiceWorker';
import rootSaga from './sagas';
import reducers from './reducers';
import App from './views/App';
import history from './configs/history';

// addLocaleData(es);
// addLocaleData(en);

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);

const store = createStore(
  connectRouter(history)(reducers(history)),
  composeWithDevTools(compose(middleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App locale="en" history={history} />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
registerServiceWorker();
