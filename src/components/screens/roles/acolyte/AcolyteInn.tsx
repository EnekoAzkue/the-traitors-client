import { Images } from "../../../../helpers/constants/constants";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import React, { useContext, useEffect, useState } from "react";


function AcolyteInn() {

  // --- CONTEXTS && STORES --- //

  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.ACOLYTE_INN_BASE);

  // --- EFFECTS --- //

  // --- FUNCTIONS --- // 

  return (
    <AcolyteTowerContainer backgroundImage={backgroundImage} >
    </AcolyteTowerContainer>
  );
}

export default AcolyteInn;
