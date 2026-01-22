import { useWindowDimensions, View } from "react-native";
import { Images, Locations, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { socket } from "../../helpers/socket/socket";
import { useAngeloStore } from "../../helpers/stores/useAngeloStore";
import Button from "../Button";
import AcolyteScreenContainer from "./roles/acolyte/AcolyteScreenContainer";
import React, { useContext, useEffect, useState } from "react";


function SchoolDungen() {

  // --- CONTEXTS && STORES --- //
  const angelo = useAngeloStore(state => state.angelo)
  const {width, height} = useWindowDimensions();
  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.SCHOOL_DUNGEON);

  if (!angelo) return null;

  // --- EFFECTS --- //
  useEffect(() => {
    if (angelo.isCaptured && angelo.location === Locations.DUNGEON) {
      setBackgroundImage(Images.SCHOOL_DUNGEON_ANGELO);
    }
  }, [])
  // --- FUNCTIONS --- // 

    const startTrial = () => {
    socket.emit(SocketClientToServerEvents.START_TRIAL)
  }

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
      <View style={{ width: width, height: height, alignItems: "center" }}>
        <Button buttonText={"Send to Trial"} onPress={startTrial} />
      </View>

    </AcolyteScreenContainer>
  );
}

export default SchoolDungen;
