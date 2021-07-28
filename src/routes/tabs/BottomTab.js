/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from 'color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '@/config/colors';

import Label from '@/components/Label';

import HomeStack from '@/screens/Home';

const BottomTab = createBottomTabNavigator();

const options = {
  labelPosition: 'below-icon',
  keyboardHidesTabBar: true,
  activeTintColor: colors.PRIMARY,
  inactiveTintColor: colors.BOTTOM_TAB_INACTIVE_TINT,
  style: {
    elevation: 2,
    height: 68,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopWidth: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    borderTopColor: Color(colors.WHITE).rgb().alpha(0.15).toString()
  },
  tabStyle: {
    paddingTop: 13
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'Poppins-Regular',
    lineHeight: 16
  }
};

const BottomTabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName='Home'
    tabBarOptions={options}
    header={null}
    screenOptions={{
      unmountOnBlur: true
    }}
  >
    <BottomTab.Screen
      name='Home'
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} size={size} name='home' />
        ),
        tabBarLabel: ({ focused, color }) => (
          <CustomLabel focused={focused} color={color}>
            Inicio
          </CustomLabel>
        )
      }}
    />
    <BottomTab.Screen
      name='shopping'
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons color={color} size={size} name='add-shopping-cart' />
        ),
        tabBarLabel: ({ focused, color }) => (
          <CustomLabel focused={focused} color={color}>
            Comprar
          </CustomLabel>
        )
      }}
    />
    <BottomTab.Screen
      name='search'
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} size={size} name='search' />
        ),
        tabBarLabel: ({ focused, color }) => (
          <CustomLabel focused={focused} color={color}>
            Buscar
          </CustomLabel>
        )
      }}
    />
    <BottomTab.Screen
      name='category'
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} size={size} name='grid' />
        ),
        tabBarLabel: ({ focused, color }) => (
          <CustomLabel focused={focused} color={color}>
            Categorias
          </CustomLabel>
        )
      }}
    />
    <BottomTab.Screen
      name='order'
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} size={size} name='truck' />
        ),
        tabBarLabel: ({ focused, color }) => (
          <CustomLabel focused={focused} color={color}>
            Pedidos
          </CustomLabel>
        )
      }}
    />
  </BottomTab.Navigator>
);

const CustomLabel = ({ focused, children, color }) => (
  <Label color={color} fontWeight={focused ? 600 : 400} fontSize={12}>
    {children}
  </Label>
);

export default BottomTabNavigator;
