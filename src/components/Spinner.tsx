import React from 'react';
import { Bounce } from 'react-native-animated-spinkit';
import { getSpinnerStyledComponents } from '../componentStyles/SpinnerStyles';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';

function CircleSpinner() {
  
  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  // --- BUTTON STYLED COMPONENTS --- //
  const { StyledSpinnerView } = getSpinnerStyledComponents(screenDimensions);

  return (
    <StyledSpinnerView>
      <Bounce size={80} color="rgba(255, 255, 255, 1)" />
    </StyledSpinnerView>
  );
}

export default CircleSpinner;
