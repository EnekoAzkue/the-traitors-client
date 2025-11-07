import React, { useContext, useEffect, useRef } from "react";
import { Animated, Image, ImageBackground, Text, StyleSheet } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";

type InitialScreen = Screens.ACOLYTE_HOME | Screens.ACOLYTE_LAB;

export default function AcolyteMap() {
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;

  const [initialScreen, setInitialScreen] = initialRouterScreen;

  const selectInitialHomeScreen = () => setInitialScreen(Screens.ACOLYTE_HOME);
  const selectInitialLabScreen = () => {
    setInitialScreen(Screens.ACOLYTE_LAB);
    console.log("CHANGED TO LAB");
  };
  const selectInitialTowerScreen = () => setInitialScreen(Screens.ACOLYTE_TOWER);

  const cloudOpacity = useRef(new Animated.Value(1)).current;
  const cloudScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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
  }, []);

  return (
    <ImageBackground
      source={Images.ACOLYTE_MAP}
      resizeMode="cover"
      style={styles.background}
    >
      {/* Botones del mapa */}
      <IconButton
        width={40}
        height={40}
        xPos={270}
        yPos={220}
        hasBorder={true}
        backgroundImage={Images.TOWER_ICON}
        buttonOnPress={selectInitialTowerScreen}
      />
      <IconButton
        width={40}
        height={40}
        xPos={130}
        yPos={290}
        hasBorder={true}
        backgroundImage={Images.HOME_ICON}
        buttonOnPress={selectInitialHomeScreen}
      />
      <IconButton
        width={40}
        height={40}
        xPos={160}
        yPos={480}
        hasBorder={true}
        backgroundImage={Images.LAB_ICON}
        buttonOnPress={selectInitialLabScreen}
      />

      {/* Capa animada de nubes */}
      <Animated.View
        style={[
          styles.cloudOverlay,
          {
            opacity: cloudOpacity,
            transform: [{ scale: cloudScale }],
          },
        ]}
        pointerEvents="none" // para no bloquear clics
      >
        <Image
          source={Images.CLOUDS}
          resizeMode="cover"
          style={styles.cloudImage}
        />
      </Animated.View>
    </ImageBackground>
  );
}

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
  },
  cloudImage: {
    width: "100%",
    height: "100%",
  },
});
