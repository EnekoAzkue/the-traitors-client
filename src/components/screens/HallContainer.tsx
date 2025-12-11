import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { Dimensions } from 'react-native';
import { Images, Roles, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactIcons } from "../../helpers/constants/constants";
import { AcolyteInitialScreenContext, CollectionContext } from "../../helpers/contexts/contexts";
import ScreenContainer from "./ScreenContainer";
import AcolytesInHall from "./AcolytesInHallList";
import { socket } from "../../helpers/socket/socket";
import Artifact from "../../helpers/interfaces/Artifact";
import { useWindowDimensions } from "react-native";
import { useUserStore } from "../../helpers/stores/useUserStore";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { useCollectionStore } from "../../helpers/stores/useCollectionStore";
import { useActivatedArtifactStore } from "../../helpers/stores/useActivatedArtifactStore";
import { AritfactOnHall } from "./AritfactOnHall";
import CircleSpinner from "../Spinner";
import styled from "styled-components/native";
import IconButton from "./IconButton";
import Button from "../Button";

const { width, height } = Dimensions.get('window');
import { useShowRosetteStore } from "../../helpers/stores/useShowRosetteStore";

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function HallContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS --- //
  const {width, height}                                         = useWindowDimensions(); 
  const user                                                    = useUserStore(state => state.user);
  const setIsRosetteShown                                       = useShowRosetteStore( state => state.setIsRosetteShown );
  const activatedArtifacts                                      = useActivatedArtifactStore(state => state.activatedArtifacts);
  const {areAllArtifactsCollected, setAreAllArtifactsCollected} = useCollectionStore(state => state);

  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const collectionContext   = useContext(CollectionContext);

  if (!user) return;
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  if (!collectionContext) return;

  const setInitialScreen = initialRouterScreen[1];

  const [isSpinnerShowing, setIsSpinnerShowing] = useState<boolean>(false);
  const [acolytesInHall, setAcolytesInHall] = useState<KaotikaPlayer[]>([]);
  const [areArtifactsShowing, setAreArtifactsShowing] = useState<boolean>(false);
  const [artifactsToShow, setArtifactsToShow] = useState<Artifact[]>([]);

  // --- EFFECTS --- //
  useEffect(() => {

    setArtifactsToShow(activatedArtifacts);
    console.log(artifactsToShow)


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
      setAreArtifactsShowing(true);
      setIsSpinnerShowing(true);
    });

    socket.on(SocketServerToClientEvents.END_VALIDATION, (accepted) => {
      setArtifactsToShow([]);
      setAreArtifactsShowing(false);
      if(accepted) {
        setIsRosetteShown(true);
      }
    })

    return () => {
      socket.off(SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL);
      socket.off(SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL);
      socket.off(SocketServerToClientEvents.SENDING_ARTIFACTS);
      socket.off(SocketServerToClientEvents.END_VALIDATION);
    };
  }, []);

  // --- FUNCTIONS --- //
  const returnToMap = () => {
    setInitialScreen('SchoolMap');
    socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, false);
  }

  const showArtifacts = () => {
    socket.emit(SocketClientToServerEvents.SHOW_ARTIFACTS);
    console.log('show artifacts emitted');
    setAreAllArtifactsCollected(false);
    setIsSpinnerShowing(true);
  }

  const dismissArtifacts = () => {
    socket.emit(SocketClientToServerEvents.DISCARD_ARTIFACTS)
  }

  const validateArtifacts = () => {
    socket.emit(SocketClientToServerEvents.ACCEPT_ARTIFACTS);
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
    align-items: center; 
    width: ${width}px;
    margin-top: ${height * 0.35}px;
    position: absolute;
  `;

  const ArtifactIconContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;    
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: ${width * 0.9}px;
    height: ${height * 0.2}px;
  `;


  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        { isSpinnerShowing &&
          <>
            <CircleSpinner>
              <Text style={{ color: 'white', fontFamily: 'KochAltschrift', fontSize: width * 0.08, justifyContent: 'center', alignItems: 'center' }}>Waiting for validation...</Text>
            </CircleSpinner>
          </>
        }
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
              <View style={{ width: width, height: height, alignItems: "center" }}>
                <Button buttonText="Show artifacts" onPress={showArtifacts} />
              </View>
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
          {(areArtifactsShowing && user.rol === Roles.MORTIMER) && (
            <ArtifactContainer>
              <ArtifactIconContainer>
                {artifactsToShow.map((artifact, index) => (
                  <AritfactOnHall key={index}icon={{ uri: artifact.image }} delay={500 * index} />
                ))}
              </ArtifactIconContainer>
              <View style={{ top: height * 0.2 }}>
                <View style={{ right: width * 0.5 }}>
                  <Button buttonText="Dismiss" onPress={dismissArtifacts} />
                </View>
                <View>
                  <Button buttonText="Validate" onPress={validateArtifacts} />
                </View>
              </View>
            </ArtifactContainer>
          )}
        </>
        {children}
      </ScreenContainer>
    </View>
  );
};