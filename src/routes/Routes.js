import React, { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import SignedStack from '@/routes/stacks/SignedStack';
import SignInRoute from '@/routes/stacks/SignInStack';
import NoInternetScreen from '@/screens/NoInternet';

import useAuth from '@/hooks/useAuth';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  const { signed, userData } = useAuth();
  const { isConnected } = useNetInfo();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (!isConnected && !undefined) {
    return (
      <Navigator headerMode='none'>
        <Screen name='NoInternet' component={NoInternetScreen} />
      </Navigator>
    );
  }

  return signed ? <SignInRoute /> : <SignedStack />;
};

export default Routes;
