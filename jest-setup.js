
// Mock Firebase push notifications
jest.mock('./src/helpers/firebaseCloudMessages/pushNotifications', () => ({
  requestUserPermission: jest.fn().mockResolvedValue(2),
  callMessageReceiverListener: jest.fn(),
}));

// mock Google SignIn
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signOut: jest.fn().mockResolvedValue(true),
    hasPreviousSignIn: jest.fn().mockResolvedValue(false),
    signIn: jest.fn().mockResolvedValue({ user: { email: 'test@test.com' } }),
  },
}));

// mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockMapView = (props) => React.createElement(View, props, props.children);
  const MockMarker = (props) => React.createElement(View, props);
  return { default: MockMapView, Marker: MockMarker };
});

// mock react-native-vision-camera
jest.mock('react-native-vision-camera', () => ({
  Camera: jest.fn(),
  useCameraDevice: jest.fn(),
  useCameraPermission: jest.fn(() => [true, jest.fn()]),
  useCodeScanner: jest.fn(() => [null, jest.fn()]),
  Code: jest.fn(),
}));

// jest-setup.js
jest.mock('@react-native-firebase/messaging', () => {
  return jest.fn(() => ({
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn().mockResolvedValue(null),
    requestPermission: jest.fn().mockResolvedValue(2),
  }));
});

// mock cualquier otro módulo nativo problemático
jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('react-native-google-auth', () => ({
  default: {
    authenticate: jest.fn(),
    signOut: jest.fn(),
  },
}));
