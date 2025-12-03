import { useWindowDimensions, View } from "react-native";
import IconButton from "../../IconButton";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import React, { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../../../helpers/contexts/contexts";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";


function AcolyteTower() {

  // --- CONTEXTS && STORES --- //
  const scrollContext = useContext(ScrollContext);
  const user = useUserStore( state => state.user);

  if (!scrollContext) return;
  if (!user) return;

  const [scrollActive, setScrollActive] = scrollContext;
  const { width, height } = useWindowDimensions(); 

  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.TOWER);

  // --- EFFECTS --- //
  useEffect(() => {
    if (user.insideTower) {
      setBackgroundImage(Images.TOWER_INSIDE);
    } else {
      setBackgroundImage(Images.TOWER);
    }
  }, [user.insideTower]);

  // --- FUNCTIONS --- // 
  const setScroll = () => {
    socket.emit(SocketClientToServerEvents.SEND_NOTIFICATION_TO_MORTIMER, { notification: { title: "Pergamino encontrado", body: "Un acólito ha encontrado el pergamino." } });
    socket.emit(SocketClientToServerEvents.SEND_FOUND_SCROLL);
    setScrollActive(false);
  }

  return (
    <AcolyteTowerContainer backgroundImage={backgroundImage} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {user.insideTower && scrollActive &&
          <IconButton
            width={width * 0.6}
            height={height * 0.3}
            xPos={width * 0.23}
            yPos={height * 0.4}
            hasBorder={false}
            hasBrightness={true}
            backgroundImage={Images.SCROLL}
            buttonOnPress={setScroll}
            backgrounOpacity={0}
          />
        }
      </View>
    </AcolyteTowerContainer>
  );
}

export default AcolyteTower;
