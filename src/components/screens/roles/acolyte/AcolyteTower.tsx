import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { ScrollContext, UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import { Dimensions } from 'react-native';
import { socket } from "../../../../helpers/socket/socket";

const { width, height } = Dimensions.get('window');

function AcolyteTower() {
  // --- CONTEXTS --- //
  const userContext = useContext(UserContext);
  const scrollContext = useContext(ScrollContext);

  if (!scrollContext) return;
  if (!userContext) return;

  const [scrollActive, setScrollActive] = scrollContext;
  const [user] = userContext;

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
