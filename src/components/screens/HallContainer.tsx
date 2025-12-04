import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Dimensions } from 'react-native';
import { Images, Roles, SocketClientToServerEvents, SocketServerToClientEvents } from "../../helpers/constants/constants";
import { AcolyteInitialScreenContext, CollectionContext } from "../../helpers/contexts/contexts";
import ScreenContainer from "./ScreenContainer";
import IconButton from "./IconButton";
import { socket } from "../../helpers/socket/socket";
import Button from "../Button";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolytesInHall from "./AcolytesInHallList";
import styled from "styled-components/native";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { useCollectionStore } from "../../helpers/stores/useCollectionStore";

const { width, height } = Dimensions.get('window');

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function HallContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS --- //
  const user = useUserStore(state => state.user);
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const collectionContext = useContext(CollectionContext)

  if (!user) return null;
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  if (!collectionContext) return

  const setInitialScreen = initialRouterScreen[1];
  const areAllArtifactsCollected = useCollectionStore(state => state.areAllArtifactsCollected)

  const [acolytesInHall, setAcolytesInHall] = useState<KaotikaPlayer[]>([]);

  // --- EFFECTS --- //
  if (user.rol !== Roles.ACOLYTE) {
    useEffect(() => {
      socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);
    }, []);

    socket.on(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL, (acolytes: KaotikaPlayer[]) => {
      setAcolytesInHall(acolytes);
    })

    socket.on(SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL, () => {
      socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);
    })
  }

  // --- FUNCTIONS --- //
  const returnToMap = () => {
    setInitialScreen('SchoolMap')
    socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, false)
  }

  const showArtifacts = () => {
    socket.emit(SocketClientToServerEvents.SHOW_ARTIFACTS)
  }

  const AcolytesRegisterScreenContainer = styled.View`
  align-items: center; 
  flex: 1; 
  width: ${width}px;
  margin-top: ${height * 0.05}px;
  position: absolute;
`;

  const AcolytesRegisterListContainer = styled.View`
  flex: 1;
  width: ${width * 0.9}px;
  height: ${height * 0.17}px;
  border: 1px solid rgba(0, 144, 171);
  border-radius: 8px;
  background-color: rgba(0,0,0,0.3);
`;

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {user.rol === Roles.ACOLYTE && (
          <>
            <IconButton
              width={width * 0.3}
              height={height * 0.07}
              hasBrightness={true}
              backgroundImage={Images.BACK_ARROW}
              buttonOnPress={returnToMap}
              xPos={20}
              yPos={20}
              hasBorder={false}
              backgrounOpacity={0}
            />
            {/* pendiente para la siguiente historia
            {areAllArtifactsCollected && (
              <Button buttonText="Show artifacts" onPress={showArtifacts} />
            )}
              */}
          </>
        )}
        {user.rol === Roles.MORTIMER && (
          <>
            <AcolytesRegisterScreenContainer>
              <AcolytesRegisterListContainer >
                {acolytesInHall.length === 0 ? (
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: 'white', fontFamily: 'KochAltschrift', fontSize: 40 }}>No acolytes in hall</Text>
                  </View>)
                  :
                  <AcolytesInHall acolytesInHall={acolytesInHall} />
                }
              </AcolytesRegisterListContainer>
            </AcolytesRegisterScreenContainer>
          </>
        )}
        {children}
      </ScreenContainer>
    </View>
  );
};