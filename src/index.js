/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

import theme from './utils/theme';
import App from './pages/_app.js';
import client from './apollo/initApollo.js';
import { UserInfoContextWrapper } from './components/UserInfo/UserInfoContext';
import GlobalLoader from './components/_common/GlobalLoader';

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ThemeProvider theme={theme}>
          <UserInfoContextWrapper>
            <App />
          </UserInfoContextWrapper>
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
    <GlobalLoader />
  </>,
  document.getElementById('root'),
);

window.addEventListener('load', () => {
  navigator.serviceWorker
    .register('./serviceworker.js')
    .then((reg) => console.log('Success: ', reg.scope))
    .catch((err) => console.log('Failure: ', err));
});
