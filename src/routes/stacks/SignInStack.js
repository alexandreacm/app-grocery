import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '@/screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

const SignInStack = () => (
  <Navigator headerMode='none'>
    <Screen name='sign-in' component={SignIn} />
    <Screen name='create-new-password' component={SignIn} />
    <Screen name='recovery-password' component={SignIn} />
  </Navigator>
);

export default SignInStack;
