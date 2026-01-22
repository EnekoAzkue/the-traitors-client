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

    const startTrial = () => {
    socket.emit(SocketClientToServerEvents.START_TRIAL)
  }

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
                <Button buttonText="Start trial" onPress={startTrial} />
    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
