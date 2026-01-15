import Swamp from "./screens/Swamp";
import AcolyteMap from "./screens/roles/acolyte/AcolyteMap";
import Obituary from "./screens/roles/acolyte/Obituary";
import HallOfSages from "./screens/HallOfSages";
import AcolyteSchoolMap from "./screens/roles/acolyte/AcolyteSchoolMap";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../helpers/socket/socket";
import { useUserStore } from "../helpers/stores/useUserStore";
import { AcolyteInitialScreenContext } from "../helpers/contexts/contexts";
import { Screens, SocketClientToServerEvents } from "../helpers/constants/constants";
import Inn from "./screens/roles/acolyte/AcolyteInn";
import Hollow from "./screens/roles/acolyte/AcolyteHollow";
import SchoolDungeon from "./screens/SchoolDungeon";
import Home from "./screens/Home";
import Lab from "./screens/Lab";
import Tower from "./screens/Tower";
import { useAcolytesCurrentNavigationTabStore } from "../helpers/stores/useAcolytesCurrentNavigationTabStore";

export default function Router() {

  // --- CONTEXTS && STORES --- //
  const initialScreenContext = useContext( AcolyteInitialScreenContext );
  const user = useUserStore( state => state.user );
  const setInitialRouteScreen = useAcolytesCurrentNavigationTabStore(state => state.setAcolyteCurrentTabNavigation);
  

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

  useEffect(() => {
    setInitialRouteScreen(Screens.MAP)    
  }, [])

  return (
    <>
      {initialScreen === Screens.MAP                     && <AcolyteMap />}
      {initialScreen === Screens.SCHOOL_MAP       && <AcolyteSchoolMap />}
      {initialScreen === null             && <Home />}
      {initialScreen === Screens.LAB              && <Lab />}
      {initialScreen === Screens.ACOLYTE_TOWER    && <Tower />}
      {initialScreen === Screens.HALL_OF_SAGES    && <HallOfSages />}
      {initialScreen === Screens.SWAMP            && <Swamp />}
      {initialScreen === Screens.OBITUARY         && <Obituary />}
      {initialScreen === Screens.ACOLYTE_INN      && <Inn />}
      {initialScreen === Screens.ACOLYTE_HOLLOW   && <Hollow />}
      {initialScreen === Screens.DUNGEON          && <SchoolDungeon />}

    </>
  );

}