import { Images, INN_STATES } from "../../../../helpers/constants/constants";
import { useInnStore } from "../../../../helpers/stores/useInnStateStore";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import BetrayerModal from "../../../BetrayerModal";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import React, { useEffect, useState } from "react";

function AcolyteInn() {

  // --- CONTEXTS && STORES --- //
  const {innState, setInnState} = useInnStore(state => state);
  const user = useUserStore(state => state.user);

  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.ACOLYTE_INN_BASE);

  if (!user) return null;

  // --- EFFECTS --- //
  useEffect(() => {
    if (user.isBetrayer){
      setInnState(INN_STATES.INSIDE_INN);
    }else{
      setInnState(INN_STATES.SHOW_BETRAYER_MODAL);
    }
  }, []);

  useEffect(() => {
    console.log("Current Inn State: ");
    console.log(innState);
    switch (innState){
      case (INN_STATES.SHOW_BETRAYER_MODAL): // 0
        
      break;
      
      case (INN_STATES.INSIDE_INN): // 1
        
      break;
      
    }

  }, [innState]);

  // --- FUNCTIONS --- // 

  return (
    <>
      {(innState === INN_STATES.SHOW_BETRAYER_MODAL && 
        <BetrayerModal/>
      )}

      <AcolyteTowerContainer backgroundImage={backgroundImage} >
      </AcolyteTowerContainer>
    </>
  );
}

export default AcolyteInn;
