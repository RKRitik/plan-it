/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import NavigationContainer from './src/navigation';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/reducers/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/graphql/client';

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <NavigationContainer />
        </Provider>
      </ApolloProvider>
    </PaperProvider>
  );
}
