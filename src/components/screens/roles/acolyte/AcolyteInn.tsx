import { Images } from "../../../../helpers/constants/constants";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import React, { useContext, useEffect, useState } from "react";


function AcolyteInn() {

  // --- CONTEXTS && STORES --- //
  const [innState, setInnState] = useState<number>(0);

  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.ACOLYTE_INN_BASE);

  // --- EFFECTS --- //
  useEffect(() => {}, []);

  // --- FUNCTIONS --- // 

  return (
    <AcolyteTowerContainer backgroundImage={backgroundImage} >

    </AcolyteTowerContainer>
  );
}

export default AcolyteInn;
