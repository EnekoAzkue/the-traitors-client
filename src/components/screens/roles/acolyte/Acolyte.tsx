import React, { useContext, useEffect } from "react";
import AcolyteMap from "./AcolyteMap";
import { Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteSchoolMap from "./AcolyteSchoolMap";
import AcolyteHome from "./AcolyteHome";
import AcolyteLab from "./AcolyteLab";
import AcolyteSettings from "./AcolyteSettings";
import AcolyteTower from "./AcolyteTower";
import AcolyteHall from "./AcolyteHall";
import Swamp from "../../Swamp";
import { useUserStore } from "../../../../helpers/stores/useUserStore";

export default function Acolyte() {

  // --- CONTEXTS && STORES --- //
  const initialScreenContext = useContext( AcolyteInitialScreenContext );
  const user = useUserStore( state => state.user );

  if ( !initialScreenContext ) return;
  if ( !user ) return;

  const [initialScreen] = initialScreenContext;

  // --- EFFECTS --- //
  useEffect(() => {
    if (initialScreen === Screens.ACOLYTE_TOWER) {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, true)
    } else {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, false)
    }

    if (initialScreen === Screens.SWAMP) {
      socket.emit(SocketClientToServerEvents.UPDATE_USER, user.email, { inSwamp : true });
    } else {
      socket.emit(SocketClientToServerEvents.UPDATE_USER, user.email, { inSwamp : false});
    }
  }, [initialScreen])

  return (
    <>
      {initialScreen === null               && <AcolyteMap />}
      {initialScreen === 'SchoolMap'        && <AcolyteSchoolMap />}
      {initialScreen === 'AcolyteHome'      && <AcolyteHome />}
      {initialScreen === 'AcolyteLab'       && <AcolyteLab />}
      {initialScreen === 'AcolyteSettings'  && <AcolyteSettings />}
      {initialScreen === 'AcolyteTower'     && <AcolyteTower />}
      {initialScreen === 'AcolyteHall'      && <AcolyteHall />}
      {initialScreen === 'Swamp'            && <Swamp />}
    </>
  );

}