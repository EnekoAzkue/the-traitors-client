import { View } from "react-native";
import IconButton from "../../../IconButton";
import React, { useEffect, useState } from "react";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { useScrollStore } from "../../../../helpers/stores/useScrollStore";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";


function AcolyteTower() {

  const [backgroundImage, setBackgroundImage] = useState(Images.TOWER);

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  const {scrollActive, setScrollActive} = useScrollStore();


  const {user} = useUserStore();
  if (!user) return;


  useEffect(() => {

    console.log(`Inside tower? ${user.insideTower}`)
    if (user.insideTower) {
      setBackgroundImage(Images.TOWER_INSIDE);
    } else {
      setBackgroundImage(Images.TOWER);
    }
  }, [user.insideTower]);

  const setScroll = () => {

    console.log("Send to Mortimer the scroll message");
    // Send server a request to server to send a notification to mortimer user
    socket.emit(SocketClientToServerEvents.SEND_NOTIFICATION_TO_MORTIMER, {notification : { title: "Pergamino encontrado", body: "Un acólito ha encontrado el pergamino." }});
    socket.emit(SocketClientToServerEvents.SEND_FOUND_SCROLL);
    setScrollActive(false);
  }

  return (
    <AcolyteTowerContainer backgroundImage={backgroundImage} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {user.insideTower && scrollActive && ( 
        <IconButton
        width={screenDimensions.width * 0.6}
        height={screenDimensions.height * 0.3}
        xPos={screenDimensions.width * 0.23}
        yPos={screenDimensions.height * 0.4}
        hasBorder={false}
        hasBrightness={true}
        backgroundImage={Images.SCROLL}
        buttonOnPress={setScroll}
        backgrounOpacity={0}
        />)

        }
      </View>
    </AcolyteTowerContainer>
  );
}


export default AcolyteTower;
