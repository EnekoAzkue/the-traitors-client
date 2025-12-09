export default {
  initializeApp: jest.fn(),
  app: jest.fn().mockReturnValue({
    name: '[DEFAULT]',
    options: {},
  }),
  onAppReady: jest.fn(),
};
