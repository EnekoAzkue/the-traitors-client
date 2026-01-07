import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Animated, useWindowDimensions } from "react-native";
import { AcolytesInHallListProps } from "../../helpers/interfaces/components/AcolitesInHallListProps";

const AcolytesInHallList = ({ acolytesInHall }: AcolytesInHallListProps) => {

  const { width, height } = useWindowDimensions();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [acolytesInHall]);


  const AnimatedCircleWrapper = styled(Animated.View)`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-radius: 50px;
    background-color: rgba(255,255,255,0.1);
    border: 2px solid rgba(0, 144, 171);
    overflow: hidden; 
  `;

  const Container = styled.View`
    flex: 1;           
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 20px 0px; 
    flex-direction: row;
    gap: 12px;
  `;

  const CircleImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 50px;
  `;

  return (
    <Container>
      {acolytesInHall.map((acolyte, index) => {
        if (acolyte.isBetrayer) return null;
        return (
          <AnimatedCircleWrapper
            key={index}
            style={{
              transform: [{ scale }],
              opacity,
            }}
          >
            <CircleImage source={{ uri: acolyte.avatar }} resizeMode="cover" />
          </ AnimatedCircleWrapper>
        );
      })}
    </Container>
  );
};

export default AcolytesInHallList;
