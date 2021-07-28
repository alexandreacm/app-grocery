import React, { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import Credentials from '@/store/Credentials';

import HomeStack from '@/routes/stacks/HomeStack';
import SignInRoute from '@/routes/stacks/SignInStack';
import NoInternetScreen from '@/screens/NoInternet';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  const [signed, setSignet] = useState(false);
  const { isConnected } = useNetInfo();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    (async () => {
      setSignet(await Credentials.getAccessToken());
    })();
  }, []);

  if (!isConnected && !undefined) {
    return (
      <Navigator headerMode='none'>
        <Screen name='NoInternet' component={NoInternetScreen} />
      </Navigator>
    );
  }

  return !signed ? <SignInRoute /> : <HomeStack />;
};

export default Routes;
