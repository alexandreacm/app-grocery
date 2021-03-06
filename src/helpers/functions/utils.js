import Animated, { Easing } from 'react-native-reanimated';

import {
  PICKUP_STORE,
  DELIVERY_HOME,
  CREDIT_CARD,
  DEBIT_CARD,
  CASH,
  FOOD_VOUCHER,
  HEALTH_INSURANCE,
  SIM,
  NAO
} from '@/helpers/constants/common';

const { Value, clockRunning, stopClock, startClock, set, cond, timing } =
  Animated;

export const runTiming = (clock, value, dest, config = {}) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const timingConfig = {
    duration: 200,
    toValue: new Value(0),
    easing: Easing.ease,
    ...config
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(timingConfig.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, timingConfig),
    cond(state.finished, stopClock(clock)),
    state.position
  ];
};

export const handlePixels = value => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

export const convertToNumber = textNumber =>
  textNumber ? parseFloat(textNumber.replace(',', '.')) : 0;

export const pickupOptions = [
  { value: PICKUP_STORE, label: 'Retirada na loja' },
  { value: DELIVERY_HOME, label: 'Entrega em Domicilio' }
];

export const paymentOptions = [
  { value: CREDIT_CARD, label: 'Cartão de Crédito' },
  { value: DEBIT_CARD, label: 'Cartão de Débito' },
  { value: CASH, label: 'Dinheiro' },
  { value: FOOD_VOUCHER, label: 'Vale Alimentação' },
  { value: HEALTH_INSURANCE, label: 'Convênio' }
];

export const cpfOptions = [
  { value: SIM, label: 'Sim' },
  { value: NAO, label: 'Não' }
];
