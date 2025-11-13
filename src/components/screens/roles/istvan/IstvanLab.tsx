import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../../ScreenContainer';
import { useCameraPermission, Camera, useCameraDevice, useCodeScanner, Code } from 'react-native-vision-camera';
import { ModalContext } from '../../../../helpers/contexts/contexts';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Button from '../../../Button';
import useMetrics from '../../../../helpers/use-metrics';
import { Images, navigationTabMarginBottomForScreens, SocketClientToServerEvents } from '../../../../helpers/constants/constants';
import { socket } from '../../../../helpers/socket/socket';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type RootTabParamList = {
  IstvanHome: undefined;
  IstvanLab: undefined;
  IstvanSettings: undefined;
  // otros tabs si los hay
};

const IstvanLab = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const setModalMessage = useContext(ModalContext)!;
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const codeScanner = useCodeScanner({ codeTypes: ['qr'], onCodeScanned });

  async function handlePress() {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        setModalMessage('Debes dar permiso para usar la cámara');
        return;
      }
    }
    toggleCameraAndTabBar();
  }

  function toggleCameraAndTabBar() {
    const updatedIsCameraOpen = !isCameraOpen;
    setIsCameraOpen(updatedIsCameraOpen);

    // Ocultar o mostrar el tabBar
    navigation.setOptions({
      tabBarStyle: updatedIsCameraOpen ? { display: 'none' } : undefined,
    });
  }

  function onCodeScanned(codes: Code[]) {
    if (codes.length === 0) return;
    const codeValue = codes[0].value;
    setModalMessage(`QR detectado: ${codeValue}`);

    // --- Emit socket event to send the email of the user which QR was scanned ---
    if (codes[0]?.value) {
      socket.emit(SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB, (codes[0]?.value));
      console.log("ISTVAN sends QR event!");
    }

    toggleCameraAndTabBar();
  }

  const BackgroundImage = styled.ImageBackground`
  width: ${width}px;
  height: ${Math.floor(height * 0.938)}px;
  `;

  const StyledContainer = styled.View`
  width: ${width}px;
  height: ${Math.floor(height * 0.938)}px;
  `;

  const StyledCameraContainer = styled.View`
    width: ${width}px;
    height: ${height}px;
  `;

  const StyledButtonContainer = styled.View`
    position: absolute; 
    left: ${width * 0.24}px;
    top: ${height * 0.67}px;
  `;




  return (
    <StyledContainer>
      {
        (isCameraOpen && device) ?
          <StyledCameraContainer>
            <Camera device={device} isActive={true} style={StyleSheet.absoluteFill} codeScanner={codeScanner} />
            <StyledButtonContainer>
              <Button onPress={toggleCameraAndTabBar} buttonText="Close Camera" />
            </StyledButtonContainer>
           </StyledCameraContainer>
          :

          <>
            {/* <View style={{ marginBottom: navigationTabMarginBottomForScreens }}> */}
              <BackgroundImage source={Images.ISTVAN_LAB}>
                <StyledButtonContainer>
                  <Button buttonText="Open Camera" onPress={handlePress} />
                </StyledButtonContainer>
              </BackgroundImage>
            {/* </View> */}
          </>

      }

    </StyledContainer>

  );
};

export default IstvanLab;
