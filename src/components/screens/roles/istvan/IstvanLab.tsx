import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../../ScreenContainer';
import { useCameraPermission, Camera, useCameraDevice, useCodeScanner, Code } from 'react-native-vision-camera';
import { ModalContext } from '../../../../helpers/contexts/contexts';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Button from '../../../Button';
import useMetrics from '../../../../helpers/use-metrics';
import { Images, SocketClientToServerEvents } from '../../../../helpers/constants/constants';
import { socket } from '../../../../helpers/socket/socket';

type RootTabParamList = {
  IstvanLab: undefined;
  // otros tabs si los hay
};

const IstvanLab = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const setModalMessage = useContext(ModalContext)!;
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const codeScanner = useCodeScanner({ codeTypes: ['qr'], onCodeScanned });

  const { moderateScale } = useMetrics();
  const buttonFixedSize = 60;
  const scaleFactor = 0.2;
  const buttonCustomStyleObj = {
    width: moderateScale(buttonFixedSize, scaleFactor),
    height: moderateScale(buttonFixedSize, scaleFactor),
    position: 'absolute',
    bottom: '5%',
    borderRadius: moderateScale(buttonFixedSize / 2, scaleFactor),
    overflow: 'hidden',
    outlineColor: '#ffffff',
    outlineWidth: moderateScale(3.5, scaleFactor - 0.1),
  };

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
    if(codes[0]?.value){
      socket.emit(SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB, (codes[0]?.value));
      console.log("ISTVAN sends QR event!");
    }

    toggleCameraAndTabBar();
  }

  if (isCameraOpen && device) {
    return (
      <>
        <Camera
          device={device}
          isActive={true}
          style={StyleSheet.absoluteFill}
          codeScanner={codeScanner}
        />
        <Button
          onPress={toggleCameraAndTabBar}
          buttonText=""
        />
      </>
    );
  }

  return (
    <ScreenContainer backgroundImg={Images.ISTVAN_LAB}>
      <Button buttonText="Open Camera" onPress={handlePress} />
    </ScreenContainer>
  );
};

export default IstvanLab;
