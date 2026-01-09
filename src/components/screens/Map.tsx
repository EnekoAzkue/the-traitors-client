import Rosette from "../Rosette";
import IconButton from "./IconButton";
import styled from "styled-components/native";
import { socket } from "../../helpers/socket/socket";
import React, { useContext, useEffect, useRef } from "react";
import { useUserStore } from "../../helpers/stores/useUserStore";
import { Animated, Image, Text, StyleSheet, View } from "react-native";
import { useArtifactsStore } from "../../helpers/stores/useArtifactStore";
import { useCollectionStore } from "../../helpers/stores/useCollectionStore";
import { useShowRosetteStore } from "../../helpers/stores/useShowRosetteStore";
import { useScreenDimensions } from "../../helpers/stores/useScreenDimensionsStore";
import { AcolyteInitialScreenContext, CollectionContext } from "../../helpers/contexts/contexts";
import { Images, Screens, SocketClientToServerEvents, SocketServerToClientEvents } from "../../helpers/constants/constants";

export default function Map() {

  // --- CONTEXTS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const collectionContext = useContext(CollectionContext)
  const user = useUserStore(state => state.user);
  const {artifacts, setArtifacts} = useArtifactsStore(state => state);
  const setAreAllArtifactsCollected = useCollectionStore(state => state.setAreAllArtifactsCollected);
  const isRosetteShown = useShowRosetteStore( state => state.isRosetteShown );
  
  
  if (!screenDimensions) return;
  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;
  if (!collectionContext) return
  if (!user) return

  const setInitialScreen = initialRouterScreen[1];
  const areAllArtifactsCollected = useCollectionStore(state => state.areAllArtifactsCollected)

  
  console.log('are all artifacts collected?:', areAllArtifactsCollected)
  // --- FUNCTIONS --- //
  const selectInitialHomeScreen = () => setInitialScreen(Screens.SCHOOL_MAP);
  const selectInitialTowerScreen = () => setInitialScreen(Screens.TOWER);
  const selectInitialSwampScreen = () => setInitialScreen(Screens.SWAMP);
  const selectInitialInnScreen = () => setInitialScreen(Screens.INN);  
  const selectInitialHollowScreen = () => setInitialScreen(Screens.HOLLOW);  

  // --- REFS --- //
  // Refs used on cloud animation
  const cloudOpacity = useRef(new Animated.Value(1)).current;
  const cloudScale = useRef(new Animated.Value(1)).current;

  // --- EFFECTS --- //
  useEffect(() => {

    console.log(user)
    Animated.parallel([
      Animated.timing(cloudOpacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(cloudScale, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    socket.emit(SocketClientToServerEvents.REQUEST_ARTIFACTS, user.rol);

    socket.on(SocketServerToClientEvents.SENDING_ARTIFACTS, (artifacts) => {

    socket.on(SocketServerToClientEvents.COLLECTED, () => {
      socket.emit(SocketClientToServerEvents.REQUEST_ARTIFACTS, user.rol)
    })
  });
  }, []);

  // --- STYLES --- //
  const StyledAcolyteMapContainer = styled.ImageBackground`
    width: ${screenDimensions.width}px;
    height: ${screenDimensions.height}px;
  `;

  const styles = StyleSheet.create({
    background: {
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    cloudOverlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 700,
    },
    cloudImage: {
      width: "100%",
      height: "100%",
      zIndex: 700,
    },
    darkFilter: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(10, 15, 30, 0.7)",
      zIndex: 701,
    },
  });


  return (
    <StyledAcolyteMapContainer
      source={Images.MAP}
      resizeMode="cover"
    >
      <IconButton
        width={screenDimensions.width * 0.1}
        height={screenDimensions.width * 0.1}
        xPos={screenDimensions.width * 0.65}
        yPos={screenDimensions.height * 0.27}
        hasBorder={true}
        backgroundImage={Images.TOWER_ICON}
        buttonOnPress={selectInitialTowerScreen}
      />
      {!user.isBetrayer && (
        <>
          {(!isRosetteShown && areAllArtifactsCollected) ?
            <IconButton
              width={screenDimensions.width * 0.1}
              height={screenDimensions.width * 0.1}
              xPos={screenDimensions.width * 0.33}
              yPos={screenDimensions.height * 0.35}
              hasBorder={true}
              backgroundImage={Images.HOME_ICON}
              buttonOnPress={selectInitialHomeScreen}
              hasBrightness={true}
              shadowColor='#ffd000ff'
            /> :
            <IconButton
              width={screenDimensions.width * 0.1}
              height={screenDimensions.width * 0.1}
              xPos={screenDimensions.width * 0.33}
              yPos={screenDimensions.height * 0.35}
              hasBorder={true}
              backgroundImage={Images.HOME_ICON}
              buttonOnPress={selectInitialHomeScreen}
            />
          }
        </>
      )}
      <IconButton
        width={screenDimensions.width * 0.1}
        height={screenDimensions.width * 0.1}
        xPos={screenDimensions.width * 0.85}
        yPos={screenDimensions.height * 0.33}
        hasBorder={true}
        backgroundImage={Images.SWAMP_ICON}
        buttonOnPress={selectInitialSwampScreen}
      />
      <IconButton
        width={screenDimensions.width * 0.1}
        height={screenDimensions.width * 0.1}
        xPos={screenDimensions.width * 0.5}
        yPos={screenDimensions.height * 0.5}
        hasBorder={true}
        backgroundImage={Images.INN_ICON}
        buttonOnPress={selectInitialInnScreen}
      />
      {user.isBetrayer &&
      <IconButton
      width={screenDimensions.width * 0.1}
      height={screenDimensions.width * 0.1}
      xPos={screenDimensions.width * 0.33}
      yPos={screenDimensions.height * 0.35}
      hasBorder={true}
      backgroundImage={Images.HOLLOW_ICON}
      buttonOnPress={selectInitialHollowScreen}
      />
    }
      <Animated.View
        style={[
          styles.cloudOverlay,
          {
            opacity: cloudOpacity,
            transform: [{ scale: cloudScale }],
          },
        ]}
        pointerEvents="none"
      >
        <Image
          source={Images.CLOUDS}
          resizeMode="cover"
          style={[styles.cloudImage]}
        />

        <View style={styles.darkFilter} />
      </Animated.View>

      {isRosetteShown && <Rosette />}
      
    </StyledAcolyteMapContainer>
  );
}
