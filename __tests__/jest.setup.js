import { useDispatch, useSelector } from 'react-redux';

import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import MockDate from 'mockdate';
import { WebSocket } from 'mock-socket';
import { globalState } from '@/store/slices';

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useFocusEffect: jest.fn(),
    useNavigation: jest.fn(() => jest.fn),
    useRoute: () => ({
      params: {
        id: jest.fn
      }
    }),
    useIsFocused: jest.fn()
  };
});

jest.mock('react-native-reanimated', () =>
  jest.requireActual('../node_modules/react-native-reanimated/mock')
);

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => {
      return {
        bottom: 0,
        top: 0
      };
    }
  };
});

jest.mock('react-native-share', () => {
  return {
    open: jest.fn()
  };
});

jest.mock('react-native-sensitive-info', () => {
  return {
    cancelFingerprintAuth: jest.fn(),
    deleteItem: jest.fn(),
    getAllItems: jest.fn(),
    getItem: jest.fn(),
    hasEnrolledFingerprints: jest.fn(),
    isSensorAvailable: jest.fn(),
    setInvalidatedByBiometricEnrollment: jest.fn(),
    setItem: jest.fn()
  };
});

jest.mock('react-redux');
useSelector.mockImplementation(fn => fn(globalState));
useDispatch.mockReturnValue(jest.fn);

// Mock WebSocket for Reactotron
global.WebSocket = WebSocket;

// Mock system date
MockDate.set(1622394614828);
