import { Images, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { socket } from "../../helpers/socket/socket";
import { useAngeloStore } from "../../helpers/stores/useAngeloStore";
import Button from "../Button";
import AcolyteScreenContainer from "./roles/acolyte/AcolyteScreenContainer";
import React, { useContext, useEffect, useState } from "react";


function SchoolDungen() {

  // --- CONTEXTS && STORES --- //
    const isAngeloCaptured = useAngeloStore(state => state.angelo?.isCaptured)
  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.SCHOOL_DUNGEON);
  
  // --- EFFECTS --- //
    useEffect(() => {
      console.log(isAngeloCaptured)
    }, [])
  // --- FUNCTIONS --- // 
  const releaseAngelo = () => {
    socket.emit(SocketClientToServerEvents.RELEASE_ANGELO)
  }

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
      <Button buttonText={"release"} onPress={releaseAngelo} />
    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
