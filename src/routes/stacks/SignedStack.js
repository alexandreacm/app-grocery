import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@/routes/tabs/BottomTab';

const { Navigator, Screen } = createStackNavigator();

const SignedStack = () => {
  return (
    <Navigator initialRouteName='Home' headerMode>
      <Screen name='Home' component={Home} />
      <Screen name='products-detail' component={Home} />
      <Screen name='shopping-card' component={Home} />
    </Navigator>
  );
};

export default SignedStack;
