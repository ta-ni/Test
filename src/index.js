import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-intl-redux';
import configureStore from './stores';
import { AppContainer } from 'react-hot-loader';
import RootApp from 'components/RootApp';
import { getUsers, setProfile } from './actions';
import { addLocaleData } from 'react-intl';
import ruLocaleData from 'react-intl/locale-data/ru';

addLocaleData([...ruLocaleData]);

let messages = require('./messages/ru-RU.json');
let initState = {
  intl: {
    locale: 'ru-RU',
    messages: messages
  }
};
let store = configureStore(initState);

store.dispatch(getUsers())
  .then(() => store.dispatch(setProfile()))
  .then(() => render(RootApp));

const render = (Component) => {
  ReactDOM.render(<AppContainer>
      <Provider store={store}>
          <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(RootApp);

if (module.hot) {
  module.hot.accept('./components/RootApp', () => {
    render(RootApp)
  });
}
