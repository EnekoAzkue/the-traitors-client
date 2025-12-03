import React, { useContext, useEffect } from "react";
import AcolyteMap from "./AcolyteMap";
import { Screens, SocketClientToServerEvents,  } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext, UserContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteSchoolMap from "./AcolyteSchoolMap";
import AcolyteHome from "./AcolyteHome";
import AcolyteLab from "./AcolyteLab";
import AcolyteSettings from "./AcolyteSettings";
import AcolyteTower from "./AcolyteTower";
import HallOfSages from "../../HallOfSages";
import Swamp from "../../Swamp";

export default function Acolyte() {
  // --- CONTEXTS --- //
  const userContext = useContext(UserContext)
  const initialScreenContext = useContext(AcolyteInitialScreenContext)
  if (!userContext) return;
  if (!initialScreenContext) return;
  const [user] = userContext;
  const [initialScreen] = initialScreenContext;

  // --- EFFECTS --- //
  useEffect(() => {
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
      {initialScreen === 'HallOfSages' && <HallOfSages />}
      {initialScreen === 'Swamp' && <Swamp />}
    </>
  );
}