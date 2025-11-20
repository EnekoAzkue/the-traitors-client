import React, { use, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { ScrollContext, UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import { Dimensions } from 'react-native';
import { socket } from "../../../../helpers/socket/socket";

const { width, height } = Dimensions.get('window');



function AcolyteTower() {

  const [backgroundImage, setBackgroundImage] = useState(Images.TOWER);
  const userContext = useContext(UserContext);

  const scrollContext = useContext(ScrollContext);

  if(!scrollContext) return;

  const [ scrollActive, setScrollActive ] = scrollContext;

  if (!userContext) return;

  const [user] = userContext;



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
        width={width * 0.6}
        height={height * 0.3}
        xPos={width * 0.23}
        yPos={height * 0.4}
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


export default AcolyteTower;
