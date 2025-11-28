import Button from '../../../Button';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { Images } from '../../../../helpers/constants/constants';
import { useGeneralModalStore } from '../../../../helpers/stores/useGeneralModalStore';
import { useScreenDimensions } from '../../../../helpers/stores/useScreenDimensionsStore';
import { getIstvanLabScreenStyledComponents } from '../../../../componentStyles/screensStyles/roles/istvan/IstvanLabStyles';


import { getAllIstvanLabProperties, getAllIstvanLabUtilities } from '../../../../helpers/componentUtils/__screenUtils__/__rolUtils__/__istvanUtils__/istvanUtils';


const IstvanLab = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // --- ZUSTAND STORES --- //
  const screenDimensions = useScreenDimensions( state => state.screenDimensions );
  if (!screenDimensions) return;

  const setModalMessage = useGeneralModalStore(state => state.setModalMessage);


  // --- GET ALL ISTVAN LAB REQUIRED TOOLS --- //
  const istvanLabAllProps = getAllIstvanLabProperties();
  const {device, hasPermission, requestPermission, navigation} = istvanLabAllProps;

  const { handlePress, toggleCameraAndTabBar, codeScanner} = getAllIstvanLabUtilities({isCameraOpen, hasPermission, navigation, requestPermission, setModalMessage, setIsCameraOpen});



  const { BackgroundImage, StyledContainer, StyledCameraContainer } = getIstvanLabScreenStyledComponents(screenDimensions);

  return (
    <StyledContainer>
      {
        (isCameraOpen && device) ?
          <StyledCameraContainer>
            <Camera device={device} isActive={true} style={StyleSheet.absoluteFill} codeScanner={codeScanner} />
            <Button onPress={toggleCameraAndTabBar} buttonText="Close Camera" />
          </StyledCameraContainer>
          :
          <BackgroundImage source={Images.ISTVAN_LAB}>
            <Button buttonText="Open Camera" onPress={handlePress} />
          </BackgroundImage>
      }

    </StyledContainer>

  );
};

export default IstvanLab;
