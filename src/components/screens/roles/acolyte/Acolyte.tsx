import React, { useContext, useEffect } from "react";
import AcolyteMap from "./AcolyteMap";
import { Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext, ScrollContext, UserContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteSchoolMap from "./AcolyteSchoolMap";
import AcolyteHome from "./AcolyteHome";
import AcolyteLab from "./AcolyteLab";
import AcolyteSettings from "./AcolyteSettings";
import AcolyteTower from "./AcolyteTower";
import AcolyteHall from "./AcolyteHall";


export default function Acolyte() {

  const userContext = useContext(UserContext)
  if (!userContext) return;
  const [user] = userContext;
  const initialScreenContext = useContext(AcolyteInitialScreenContext)
  if (!initialScreenContext) return;
  const [initialScreen, setInitialScreen] = initialScreenContext;

  useEffect(() => {
    console.log('initianl screen:', initialScreen);
    if (initialScreen === Screens.ACOLYTE_TOWER) {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, true)
    } else {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, false)
    }

  }, [initialScreen])


  return (
    <>
        {initialScreen === null && <AcolyteMap />}
        {initialScreen === 'SchoolMap' && <AcolyteSchoolMap />}
        {initialScreen === 'AcolyteHome' && <AcolyteHome />}
        {initialScreen === 'AcolyteLab' && <AcolyteLab />}
        {initialScreen === 'AcolyteSettings' && <AcolyteSettings />}
        {initialScreen === 'AcolyteTower' && <AcolyteTower />}
        {initialScreen === 'AcolyteHall' && <AcolyteHall />}
    </>

  );


}