import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@/routes/tabs/BottomTab';
import ShoppingCard from '@/screens/ShoppingCard';

const { Navigator, Screen } = createStackNavigator();

const SignedStack = () => {
  return (
    <Navigator initialRouteName='Home' headerMode>
      <Screen name='Home' component={Home} />
      <Screen name='products-detail' component={Home} />
      <Screen name='shopping-card' component={ShoppingCard} />
    </Navigator>
  );
};

export default SignedStack;
