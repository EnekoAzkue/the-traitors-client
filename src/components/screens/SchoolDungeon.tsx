import { Images, Locations } from "../../helpers/constants/constants";
import { useAngeloStore } from "../../helpers/stores/useAngeloStore";
import AcolyteScreenContainer from "./roles/acolyte/AcolyteScreenContainer";
import React, { useEffect, useState } from "react";

function SchoolDungen() {

  // --- CONTEXTS && STORES --- //
  const angelo = useAngeloStore(state => state.angelo)
  
  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.SCHOOL_DUNGEON);

  if (!angelo) return null;
  
  // --- EFFECTS --- //
  useEffect(() => {
    if (isAngeloCaptured()) {
      setBackgroundImage(Images.SCHOOL_DUNGEON_ANGELO);
    }
  }, []);
  
  // --- FUNCTIONS --- //
  const isAngeloCaptured = () => {
    return (angelo.location === Locations.DUNGEON && angelo.isCaptured);
  };

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
