import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/components/App';

test('App renders without crashing', () => {
  render(<App />);
});
