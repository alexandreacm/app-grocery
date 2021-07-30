import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@/routes/tabs/BottomTab';
import ShoppingCard from '@/screens/ShoppingCard';
import OrderFinish from '@/screens/OrderFinish';
import ConfirmOrder from '@/screens/ConfirmOrder';

const { Navigator, Screen } = createStackNavigator();

const SignedStack = () => {
  return (
    <Navigator initialRouteName='Home' headerMode>
      <Screen name='Home' component={Home} />
      <Screen name='products-detail' component={Home} />
      <Screen name='shopping-card' component={ShoppingCard} />
      <Screen name='finish-order' component={OrderFinish} />
      <Screen name='confirm-order' component={ConfirmOrder} />
    </Navigator>
  );
};

export default SignedStack;
