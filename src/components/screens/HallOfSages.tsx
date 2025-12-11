import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { Images, Roles, Screens, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { socket } from "../../helpers/socket/socket";
import HallContainer from "./HallContainer";
import { useUserStore } from "../../helpers/stores/useUserStore";
import { IstvanInitialScreenContext, MortimerInitialScreenContext, VillainInitialScreenContext } from "../../helpers/contexts/contexts";

function HallOfSages() {
  
  // --- CONTEXTS --- // 
  const user = useUserStore(state => state.user);
  const mortimerInitialScreenContext = useContext(MortimerInitialScreenContext);
  const istvanInitialScreenContext = useContext(IstvanInitialScreenContext);
  const villainInitialScreenContext = useContext(VillainInitialScreenContext);

  
  if (!user) return;
  if (!mortimerInitialScreenContext) return;
  if (!istvanInitialScreenContext) return;
  if (!villainInitialScreenContext) return;

  const setMortimerInitialScreen = mortimerInitialScreenContext[1];
  const setIstvanInitialScreen   = istvanInitialScreenContext[1];
  const setVillainInitialScreen  = villainInitialScreenContext[1];

  // --- EFFECTS --- //
  useEffect(() => {
    if (user.rol === Roles.ACOLYTE) {
      socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, true);
    };

    switch (user.rol) {

      case (Roles.MORTIMER):
        setMortimerInitialScreen(Screens.HALL_OF_SAGES);
        socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, true);
      break;
      
      case (Roles.ISTVAN): 
        setIstvanInitialScreen(Screens.HALL_OF_SAGES);
      break;
      
      case (Roles.VILLAIN): 
        setVillainInitialScreen(Screens.HALL_OF_SAGES);
      break;

    }

  }, []);
  return (
    <HallContainer backgroundImage={Images.HALL_OF_SAGES} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
    </HallContainer>
  );
}

export default HallOfSages;