import AcolyteLab from "./AcolyteLab";
import AcolyteMap from "./AcolyteMap";
import AcolyteHall from "./AcolyteHall";
import AcolyteHome from "./AcolyteHome";
import React, { useEffect } from "react";
import AcolyteTower from "./AcolyteTower";
import AcolyteSwamp from "./AcolyteSwamp";
import AcolyteSettings from "./AcolyteSettings";
import AcolyteSchoolMap from "./AcolyteSchoolMap";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { useAcolyteInitialScreenStore } from "../../../../helpers/stores/useAcolyteInitialScreenStore";
import { manageWithSocketsUserInTowerProperty } from "../../../../helpers/componentUtils/__screenUtils__/__rolUtils__/__acolyteUtils__/AcolyteUtilities";


export default function Acolyte() {

  const {user} = useUserStore();
  if(!user) return;
  
  const acolyteInitialScreen = useAcolyteInitialScreenStore( state => state.acolyteInitialScreen);

  useEffect(() => {
    manageWithSocketsUserInTowerProperty(acolyteInitialScreen, user);
  }, [acolyteInitialScreen])


  return (
    <>
        {acolyteInitialScreen === null && <AcolyteMap />}
        {acolyteInitialScreen === 'SchoolMap' && <AcolyteSchoolMap />}
        {acolyteInitialScreen === 'AcolyteHome' && <AcolyteHome />}
        {acolyteInitialScreen === 'AcolyteLab' && <AcolyteLab />}
        {acolyteInitialScreen === 'AcolyteSettings' && <AcolyteSettings />}
        {acolyteInitialScreen === 'AcolyteTower' && <AcolyteTower />}
        {acolyteInitialScreen === 'AcolyteHall' && <AcolyteHall />}
        {acolyteInitialScreen === 'AcolyteSwamp' && <AcolyteSwamp />}
    </>

  );


}