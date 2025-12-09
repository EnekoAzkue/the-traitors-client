const mockMessaging = jest.fn(() => ({
  requestPermission: jest.fn().mockResolvedValue(2), 
  getToken: jest.fn().mockResolvedValue('mock-token'),
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  setBackgroundMessageHandler: jest.fn(),
  AuthorizationStatus: {
    NOT_DETERMINED: 0,
    DENIED: 1,
    AUTHORIZED: 2,
    PROVISIONAL: 3,
  },
}));

export default mockMessaging;
