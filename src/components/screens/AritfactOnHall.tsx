import React, { useRef, useEffect } from "react";
import { Animated, Dimensions } from "react-native";
import { swampArtifactIcons } from "../../helpers/constants/constants";
import styled from "styled-components/native";
import { AritfactOnHallProps } from "../../helpers/interfaces/components/ArtifactOnHallProps";

const { width, height } = Dimensions.get('window');

export const AritfactOnHall = ({ icon, delay }: AritfactOnHallProps ) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

const ArtifactIcon = styled.Image`
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  border: 3px solid rgba(0, 144, 171);
  border-radius: 8px;
  background-color: rgba(0,0,0,0.3);

`;

  return (
    <Animated.View style={{ opacity }}>
      <ArtifactIcon source={icon} />
    </Animated.View>
  );
};
