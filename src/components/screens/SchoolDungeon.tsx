import { Images, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { socket } from "../../helpers/socket/socket";
import { useAngeloStore } from "../../helpers/stores/useAngeloStore";
import Button from "../Button";
import AcolyteScreenContainer from "./roles/acolyte/AcolyteScreenContainer";
import React, { useContext, useEffect, useState } from "react";


function SchoolDungen() {

  // --- CONTEXTS && STORES --- //
    const angelo = useAngeloStore(state => state.angelo)
  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.SCHOOL_DUNGEON);

  if (!angelo) return null;
  
  // --- EFFECTS --- //
    useEffect(() => {
      if(angelo.isCaptured){
        setBackgroundImage(Images.SCHOOL_DUNGEON_ANGELO);
      }
    }, [])
  // --- FUNCTIONS --- // 
  const releaseAngelo = () => {
    socket.emit(SocketClientToServerEvents.RELEASE_ANGELO);
  }

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
      <Button buttonText={"release"} onPress={releaseAngelo} />
    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
