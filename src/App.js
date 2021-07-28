import React from 'react';
import { LogBox } from 'react-native';

import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import store from '@/store';
import Routes from '@/routes';

import ThemeProvider from '@/components/ThemeProvider';

if (__DEV__) {
  import('@/config/reactotron');
  LogBox.ignoreLogs(['warning']);
  LogBox.ignoreAllLogs();
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StyledSafeAreaView>
            <Routes />
          </StyledSafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export default App;
