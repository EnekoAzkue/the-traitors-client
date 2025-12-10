import Button from "../Button";
import IconButton from "./IconButton";
import styled from "styled-components/native";
import ScreenContainer from "./ScreenContainer";
import AcolytesInHall from "./AcolytesInHallList";
import { socket } from "../../helpers/socket/socket";
import Artifact from "../../helpers/interfaces/Artifact";
import { Text, useWindowDimensions, View } from "react-native";
import { useUserStore } from "../../helpers/stores/useUserStore";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { useCollectionStore } from "../../helpers/stores/useCollectionStore";
import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useActivatedArtifactStore } from "../../helpers/stores/useActivatedArtifactStore";
import { AcolyteInitialScreenContext, CollectionContext } from "../../helpers/contexts/contexts";
import { Images, Roles, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactIcons } from "../../helpers/constants/constants";

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function HallContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS --- //
  const {width, height}                     = useWindowDimensions(); 
  const user                                = useUserStore(state => state.user);
  const { activatedArtifacts, setActivatedArtifacts } = useActivatedArtifactStore(state => state);
  const {areAllArtifactsCollected, setAreAllArtifactsCollected} = useCollectionStore(state => state)

  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const collectionContext = useContext(CollectionContext)

  if (!user) return;
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  if (!collectionContext) return;

  const setInitialScreen = initialRouterScreen[1];

  const [acolytesInHall, setAcolytesInHall] = useState<KaotikaPlayer[]>([]);
  const [areArtifactsShowing, setAreArtifactsShowing] = useState<boolean>(false);
  const [artifactsToShow, setArtifactsToShow] = useState<Artifact[]>([]);

  // --- EFFECTS --- //
  useEffect(() => {

    if (user.rol !== Roles.ACOLYTE) {
      socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);
    }
    socket.on(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL, (acolytes: KaotikaPlayer[]) => {
      setAcolytesInHall(acolytes);
    });

    socket.on(SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL, () => {
      socket.emit(SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL);
    });

    socket.on(SocketServerToClientEvents.SENDING_ARTIFACTS, (artifacts) => {
      setArtifactsToShow(artifacts);
      setAreArtifactsShowing(true);
    });

    return (() => {
      socket.off(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL);
      socket.off(SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL);
      socket.off(SocketServerToClientEvents.SENDING_ARTIFACTS);
    });

  }, []);


  // --- FUNCTIONS --- //
  const returnToMap = () => {
    setInitialScreen('SchoolMap')
    socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, false);
  }

  const showArtifacts = () => {
    socket.emit(SocketClientToServerEvents.SHOW_ARTIFACTS)
    setActivatedArtifacts([])
    setAreAllArtifactsCollected(false)
  }

  const dismissArtifacts = () => {
    socket.emit(SocketClientToServerEvents.DISMISS_ARTIFACTS)
    setArtifactsToShow([])
    setAreArtifactsShowing(false)
  }

  const validateArtifacts = () => {
    socket.emit(SocketClientToServerEvents.VALIDATE_ARTIFACTS)
    setArtifactsToShow([])
    setAreArtifactsShowing(false)
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


  const ArtifactContainer = styled.View`
    position: absolute;
    top: ${height * 0.5}px;
    height: ${height * 0.6}px;
    width: ${width}px;
    align-items: center;
    border: 1px solid rgba(0, 144, 171);
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
            {areAllArtifactsCollected && (
              <Button buttonText="Show artifacts" onPress={showArtifacts} />
            )}
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
          {areArtifactsShowing && (
            <>
              <ArtifactContainer>
                {artifactsToShow.map((artifact, index) => (
                  <View key={index}>
                    <IconButton backgroundImage={swampArtifactIcons[artifact.icon]} buttonOnPress={undefined} height={width * 0.1} width={width * 0.1} xPos={width * ((index * 0.2))} yPos={height * 0.5} />
                  </View>
                ))}
              </ArtifactContainer>
              {(user.rol === Roles.MORTIMER) && (
                <>
                  <Button buttonText="Dismiss Artifacts" onPress={dismissArtifacts} />
                  <Button buttonText="Validate artifacts" onPress={validateArtifacts} />
                </>
              )}
            </>
          )}
        </>
        {children}
      </ScreenContainer>
    </View>
  );
};