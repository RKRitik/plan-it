/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import NavigationContainer from './src/navigation';
import { PaperProvider } from 'react-native-paper';

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer />
    </PaperProvider>
  );
}
