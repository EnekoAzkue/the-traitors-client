import { Code, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { socket } from "../../../../socket/socket";
import { SocketClientToServerEvents } from "../../../../constants/constants";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

type RootTabParamList = {
  IstvanHome: undefined;
  IstvanLab: undefined;
  IstvanSettings: undefined;
  // otros tabs si los hay
};

interface istvanLabAllPropsInterface {
  isCameraOpen: boolean,
  hasPermission: boolean,
  navigation: BottomTabNavigationProp<RootTabParamList>
  requestPermission: () => Promise<boolean>,
  setModalMessage: (message: string) => void,
  setIsCameraOpen: (value: React.SetStateAction<boolean>) => void,
};


export const getAllIstvanLabProperties = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  return {device, hasPermission, requestPermission, navigation};
}

export const getAllIstvanLabUtilities = ({ isCameraOpen, hasPermission, navigation, requestPermission, setModalMessage, setIsCameraOpen }: istvanLabAllPropsInterface) => {

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

  const codeScanner = useCodeScanner({ codeTypes: ['qr'], onCodeScanned });

  return { handlePress, toggleCameraAndTabBar, onCodeScanned, codeScanner };

}
