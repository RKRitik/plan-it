import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from '../components/tasks';
import AddTask from '../components/addTask';
import { useSelector } from 'react-redux';
import SplashScreen from '../components/splashScreen';
import SignIn from '../components/SignIn';
import { RootState } from '../reducers/store';

// import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import type { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Tasks: undefined;
  AddTask: { id: string | undefined };
  SignIn: undefined;
};

// export type ScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamList, 'Profile'>,
//   // StackNavigationProp<StackParamList>
// >;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationComponent() {
  //TODO: add type to redux states
  const authState = useSelector((state: RootState) => state?.authReducer);

  if (authState?.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!authState?.userInfo?.idToken ? (
          <RootStack.Screen
            options={{ headerShown: false }}
            name={'SignIn'}
            component={SignIn}
          />
        ) : (
          <>
            <RootStack.Screen name={'Tasks'} component={Tasks} />
            <RootStack.Screen name={'AddTask'} component={AddTask} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
