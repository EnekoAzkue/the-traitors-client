export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn().mockResolvedValue(true),
  signIn: jest.fn().mockResolvedValue({ idToken: 'mock-token' }),
};

const GoogleAuth = {
  signIn: jest.fn().mockResolvedValue({ idToken: 'mock-token' }),
  signOut: jest.fn().mockResolvedValue(true),
};

export default GoogleAuth;
