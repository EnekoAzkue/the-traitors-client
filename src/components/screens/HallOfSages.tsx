import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { Images, Roles, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { ArtifactsContext, UserContext } from "../../helpers/contexts/contexts";
import { socket } from "../../helpers/socket/socket";
import HallContainer from "./HallContainer";

function HallOfSages() {

  // --- CONTEXTS --- // 
  const userContext = useContext(UserContext)
  const artifactsContext = useContext(ArtifactsContext)

  if (!userContext) return
  if (!artifactsContext) return

  const [user] = userContext

  // --- EFFECTS --- //
  useEffect(() => {
    if(user.rol === Roles.ACOLYTE) {
      socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, true)
    }
  }, [])
  return (
    <HallContainer backgroundImage={Images.HALL_OF_SAGES} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
    </HallContainer>
  );
}

export default HallOfSages;