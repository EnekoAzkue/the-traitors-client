import React, { useEffect } from "react";
import { View } from "react-native";
import { Images, Roles, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { socket } from "../../helpers/socket/socket";
import HallContainer from "./HallContainer";
import { useUserStore } from "../../helpers/stores/useUserStore";

function HallOfSages() {
 
  // --- CONTEXTS --- // 
  const user = useUserStore(state => state.user);
  if (!user) return;

  // --- EFFECTS --- //
  useEffect(() => {
    if (user.rol === Roles.ACOLYTE) {
      socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, true);
    };
  }, []);
  return (
    <HallContainer backgroundImage={Images.HALL_OF_SAGES} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
    </HallContainer>
  );
}

export default HallOfSages;