import { Images } from "../../helpers/constants/constants";
import AcolyteScreenContainer from "./roles/acolyte/AcolyteScreenContainer";
import React, { useContext, useEffect, useState } from "react";


function SchoolDungen() {

  // --- CONTEXTS && STORES --- //

  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.SCHOOL_DUNGEON);

  // --- EFFECTS --- //

  // --- FUNCTIONS --- // 

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
