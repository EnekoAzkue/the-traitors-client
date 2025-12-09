import React from 'react';
import { View } from 'react-native';

const MockMapView = (props) => <View {...props} />;
const MockMarker = (props) => <View {...props} />;

export default MockMapView;
export { MockMarker as Marker };
