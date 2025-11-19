import React, { use, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Images, SocketClientToServerEventsForTesting } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { UserContext } from "../../../../helpers/contexts/contexts";
import Button from "../../../Button";
import IconButton from "../../IconButton";
import { socket } from "../../../../helpers/socket/socket";


function AcolyteTower() {

  const [backgroundImage, setBackgroundImage] = useState(Images.TOWER);
  const userContext = useContext(UserContext);

  if (!userContext) return;

  const [user] = userContext;

  useEffect(() => {

    console.log(`In tower screen? ${user.inTower} (se supone que sí)`);
    console.log(`Inside tower? ${user.insideTower}`)
    if (user.insideTower) {
      setBackgroundImage(Images.TOWER_INSIDE);
    } else {
      setBackgroundImage(Images.TOWER);
    }
  })



  return (
    <>
      <AcolyteScreenContainer backgroundImage={backgroundImage} >
        <IconButton width={80} height={80} hasBrightness={true} backgroundImage={Images.MAP_ICON} buttonOnPress={() => {
          console.log("EMMIT SOCKET TESTT!!!!!!!!");
          socket.emit(SocketClientToServerEventsForTesting.GET_FCM_MESSAGE, true);
        }} xPos={20} yPos={420} hasBorder={false} 
          
          />
        <IconButton width={80} height={80} hasBrightness={true} backgroundImage={Images.MAP_ICON} buttonOnPress={() => {socket.emit(SocketClientToServerEventsForTesting.GET_FCM_MESSAGE, false)}} xPos={290} yPos={420} hasBorder={false} />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* {(user.inTower) ?  */}
          { /* : <></>*/}
        </View>
      </AcolyteScreenContainer>
    </>
  );
}


export default AcolyteTower;