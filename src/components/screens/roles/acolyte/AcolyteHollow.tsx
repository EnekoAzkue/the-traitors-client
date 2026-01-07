import { Images } from "../../../../helpers/constants/constants";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import React, { useContext, useEffect, useState } from "react";


function AcolyteHollow() {

  // --- CONTEXTS && STORES --- //

  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.ACOLYTE_HOLLOW);

  // --- EFFECTS --- //

  // --- FUNCTIONS --- // 

  return (
    <AcolyteTowerContainer backgroundImage={backgroundImage} >
    </AcolyteTowerContainer>
  );
}

export default AcolyteHollow;
