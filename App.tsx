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

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    </PaperProvider>
  );
}
