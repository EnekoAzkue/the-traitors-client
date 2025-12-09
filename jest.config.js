module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
    '|@react-native' +
    '|@react-navigation' +
    '|@react-native-google-signin/google-signin' +
    '|@react-native-firebase' +
    '|react-native-google-auth' +
    '|react-native-drop-shadow' +
    '|react-native-maps' + // <-- añadir este también
    ')/)',
  ],

  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^react-native-maps$': '<rootDir>/__mocks__/react-native-maps.js',
    '^@react-native-community/geolocation$': '<rootDir>/__mocks__/@react-native-community/geolocation.js',
    '^react-native-vision-camera$': '<rootDir>/__mocks__/react-native-vision-camera.js',
    '^react-native-qrcode-svg$': '<rootDir>/__mocks__/react-native-qrcode-svg.js',
    '^@react-native-firebase/messaging$': '<rootDir>/__mocks__/@react-native-firebase/messaging.js',
    '^@react-native-firebase/app$': '<rootDir>/__mocks__/@react-native-firebase/app.js',


  },


  setupFiles: ['<rootDir>/jest-setup.js'],
};
