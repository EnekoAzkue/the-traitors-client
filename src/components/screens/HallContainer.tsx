import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Dimensions } from 'react-native';
import { Images, Roles, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactIcons } from "../../helpers/constants/constants";
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
import { useActivatedArtifactStore } from "../../helpers/stores/useActivatedArtifactStore";
import Artifact from "../../helpers/interfaces/Artifact";

const { width, height } = Dimensions.get('window');

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function HallContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS --- //
  const user = useUserStore(state => state.user);
  const { activatedArtifacts, setActivatedArtifacts } = useActivatedArtifactStore(state => state);
  const { areAllArtifactsCollected, setAreAllArtifactsCollected } = useCollectionStore(state => state)

  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const collectionContext = useContext(CollectionContext)


  if (!user) return null;
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  if (!collectionContext) return

  const setInitialScreen = initialRouterScreen[1];
  // --- STATE --- //

  const [acolytesInHall, setAcolytesInHall] = useState<KaotikaPlayer[]>([]);
  const [areArtifactsShowing, setAreArtifactsShowing] = useState<boolean>(false);
  const [artifactsToShow, setArtifactsToShow] = useState<Artifact[]>([]);

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

    socket.on(SocketServerToClientEvents.SENDING_ARTIFACTS, (artifacts) => {
      console.log('show artifacts')
      setArtifactsToShow(artifacts);
      setAreArtifactsShowing(true);
    });
  }


  // --- FUNCTIONS --- //
  const returnToMap = () => {
    setInitialScreen('SchoolMap')
    socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, false)
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

  const ArtifactContainer = styled.View`
  align-items: center; 
  width: ${width}px;
  margin-top: ${height * 0.25}px;
  position: absolute;
`;
  const ArtifactIconContainer = styled.View`
  position: absolute;
  flex: 1;
  width: ${width * 0.9}px;
  height: ${height * 0.3}px;
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
                  <Text style={{ color: 'white', fontFamily: 'KochAltschrift', fontSize: width * 0.08 }}>Waiting for acolytes to enter...</Text>
                </View>)
                :
                <AcolytesInHall acolytesInHall={acolytesInHall} />
              }
            </AcolytesRegisterListContainer>
          </AcolytesRegisterScreenContainer>
          {!areArtifactsShowing && (
            <ArtifactContainer>
              <ArtifactIconContainer>
                {artifactsToShow.map((artifact, index) => (
                  <View key={index}>
                    <IconButton backgroundImage={swampArtifactIcons[artifact.icon]} buttonOnPress={undefined} height={width * 0.1} width={width * 0.1} xPos={width * ((index * 0.2))} yPos={height * 0.5} />
                  </View>
                ))}
              </ArtifactIconContainer>
              {(user.rol === Roles.MORTIMER) && (
                <View style={{top: height *0.5}}>
                  <View style={{left: -width * 0.5}}>
                  <Button buttonText="Dismiss" onPress={dismissArtifacts} />
                  </View>
                  <View>
                  <Button buttonText="Validate" onPress={validateArtifacts} />
                  </View>
                </View>
              )}
            </ArtifactContainer>
          )}
        </>
        {children}
      </ScreenContainer>
    </View>
  );
};