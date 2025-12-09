import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
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

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function HallContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS --- //
  const {width, height}                     = useWindowDimensions(); 
  const [acolytesInHall, setAcolytesInHall] = useState<KaotikaPlayer[]>([]);

  const user                                = useUserStore(state => state.user);
  const initialRouterScreen                 = useContext(AcolyteInitialScreenContext);
  const collectionContext                   = useContext(CollectionContext);

  if (!user)                  return;
  if (!initialRouterScreen)   return (<Text>ERROR! Initial Router Context not got</Text>);
  if (!collectionContext)     return;

  const setInitialScreen          = initialRouterScreen[1];
  const areAllArtifactsCollected  = useCollectionStore(state => state.areAllArtifactsCollected);

  // --- EFFECTS --- //
  useEffect(() => {
    socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);
  }, []);

useEffect( () => {

  socket.on(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL, (acolytes: KaotikaPlayer[]) => {

    setAcolytesInHall(acolytes);
  })

  socket.on(SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL, () => {
    socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);
  })

  return (() => {
    socket.off(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL);
    socket.off(SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL);
  });

}, [acolytesInHall]);

  // --- FUNCTIONS --- //
  const returnToMap = () => {
    setInitialScreen('SchoolMap')
    socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, false);
  }

  const showArtifacts = () => {
    socket.emit(SocketClientToServerEvents.SHOW_ARTIFACTS);
  }

  // --- STYLED COMPONENTS --- //
  const AcolytesRegisterScreenContainer = styled.View`
    align-items: center; 
    flex: 1; 
    width: ${width}px;
    position: absolute;
    ${user.rol === Roles.ACOLYTE ? `margin-top: ${height * 0.11}px;` : `margin-top: ${height * 0.05}px;`}
  `;

  const AcolytesRegisterListContainer = styled.View`
    flex: 1;
    width: ${width * 0.9}px;
    ${user.rol === Roles.ACOLYTE ? `height: ${height * 0.17}px;` : `height: ${height * 0.23}px;`}
    border: 1px solid rgba(0, 144, 171);
    border-radius: 8px;
    background-color: rgba(0,0,0,0.3);
  `;

  const StyledHallContainerText = styled.Text`
    color: white;
    fontFamily: 'KochAltschrift';
    font-size: ${width * 0.08};
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
        <>
          <AcolytesRegisterScreenContainer>
            <AcolytesRegisterListContainer >
              {acolytesInHall.length === 0 ? (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <StyledHallContainerText>Waiting for acolytes to enter...</StyledHallContainerText>
                </View>)
                :
                <AcolytesInHall acolytesInHall={acolytesInHall} />
              }
            </AcolytesRegisterListContainer>
          </AcolytesRegisterScreenContainer>
        </>
        {children}
      </ScreenContainer>
    </View>
  );
};