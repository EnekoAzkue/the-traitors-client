import { useWindowDimensions, View } from "react-native";
import { Images, Locations, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { socket } from "../../helpers/socket/socket";
import { useAngeloStore } from "../../helpers/stores/useAngeloStore";
import AcolyteScreenContainer from "./roles/acolyte/AcolyteScreenContainer";
import React, { useEffect, useState } from "react";
import Button from "../Button";

function SchoolDungen() {

  // --- CONTEXTS && STORES --- //
  const {width, height} = useWindowDimensions();
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

  const startTrial = () => {
    socket.emit(SocketClientToServerEvents.START_TRIAL)
  }

  
  // --- FUNCTIONS --- //
  const isAngeloCaptured = () => {
    return (angelo.location === Locations.DUNGEON && angelo.isCaptured);
  };

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
      { (isAngeloCaptured()) && 
      <View style={{ width: width, height: height, alignItems: "center" }}>
        <Button buttonText={"Send to Trial"} onPress={startTrial} />
      </View>
      }

    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
