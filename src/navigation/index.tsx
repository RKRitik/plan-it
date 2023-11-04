import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from '../components/tasks';
import AddTask from '../components/addTask';
import type { CompositeNavigationProp } from '@react-navigation/native';
// import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import type { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Tasks: undefined;
  AddTask: { id: string | undefined };
};

// export type ScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamList, 'Profile'>,
//   // StackNavigationProp<StackParamList>
// >;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationComponent() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={'Tasks'} component={Tasks} />
        <RootStack.Screen name={'AddTask'} component={AddTask} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
