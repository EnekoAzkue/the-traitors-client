import Swamp from "../../Swamp";
import AcolyteMap from "./AcolyteMap";
import AcolyteLab from "./AcolyteLab";
import Obituary from "./Obituary";
import AcolyteHome from "./AcolyteHome";
import AcolyteTower from "./AcolyteTower";
import HallOfSages from "../../HallOfSages";
import AcolyteSettings from "./AcolyteSettings";
import AcolyteSchoolMap from "./AcolyteSchoolMap";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../../../helpers/socket/socket";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import Rosette from "../../../Rosette";
import AcolyteInn from "./AcolyteInn";
import AcolyteHollow from "./AcolyteHollow";
import SchoolDungen from "../../SchoolDungeon";

export default function Acolyte() {

  // --- CONTEXTS && STORES --- //
  const initialScreenContext = useContext( AcolyteInitialScreenContext );
  const user = useUserStore( state => state.user );

  if ( !initialScreenContext ) return;
  if ( !user ) return;

  const [initialScreen, setInitialScreen] = initialScreenContext;

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
      socket.emit(SocketClientToServerEvents.UPDATE_USER, user.email, { inSwamp : false });
    }
  }, [initialScreen])

  return (
    <>
      {initialScreen === null                     && <AcolyteMap />}
      {initialScreen === Screens.SCHOOL_MAP       && <AcolyteSchoolMap />}
      {initialScreen === Screens.ACOLYTE_HOME     && <AcolyteHome />}
      {initialScreen === Screens.ACOLYTE_LAB      && <AcolyteLab />}
      {initialScreen === Screens.ACOLYTE_SETTINGS && <AcolyteSettings />}
      {initialScreen === Screens.ACOLYTE_TOWER    && <AcolyteTower />}
      {initialScreen === Screens.HALL_OF_SAGES    && <HallOfSages />}
      {initialScreen === Screens.SWAMP            && <Swamp />}
      {initialScreen === Screens.OBITUARY         && <Obituary />}
      {initialScreen === Screens.ACOLYTE_INN      && <AcolyteInn />}
      {initialScreen === Screens.ACOLYTE_HOLLOW   && <AcolyteHollow />}
      {initialScreen === Screens.DUNGEON          && <SchoolDungen />}
    </>
  );

}