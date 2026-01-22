import React, { useEffect, useState, useRef } from "react";
import { useWindowDimensions, Animated } from "react-native";
import styled from "styled-components/native";
import Button from "./Button";
import { useTransitionMessageShowingStore } from "../helpers/stores/useTransitionMessageVisibilityStore";

const TransitionMessageComponentStates = {
  HIDDEN: 0,
  START_SHOWING: 1,
  SHOWING: 2,
  START_HIDDEN: 3,
}

export default function TransitionMessage () {

  // --- CONSTANTS && COMPONENTS --- //
  const {width, height} = useWindowDimensions();
  const [opacity, setOpacity] = useState(1);
  const textOpacity = useRef(new Animated.Value(0)).current;
  const {isTransitionMessageShowing, setIsTransitionMessageShowing} = useTransitionMessageShowingStore(state => state);
  const [componentState, setComponentState] = useState(TransitionMessageComponentStates.HIDDEN);

  useEffect(() => {
    if (isTransitionMessageShowing) {
      setComponentState(TransitionMessageComponentStates.SHOWING);
      // Inicia la animación fadeIn del texto
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setComponentState(TransitionMessageComponentStates.HIDDEN);
      textOpacity.setValue(0);
    }
  }, []);

  function changeToSchoolMap(){
    setComponentState(TransitionMessageComponentStates.HIDDEN);
    setIsTransitionMessageShowing(false);
  }

  const StyledFullScreenView = styled.View`
    width: ${width}px;
    height: ${height}px;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,${opacity});
    z-index: 9995;
    z-index: ${opacity === 0 ? -1 : 9995};
    pointer-events: ${opacity === 0 ? 'none' : 'auto'};
  `;

  const StyledMessageContainer = styled.View`
    width: ${width * 0.8}px;
    height: ${height * 0.4}px;
    background-color: rgb(8, 77, 48);
    border : 1px solid white;
    position: absolute;
    top: ${height * 0.3}px;
    left: ${width * 0.1}px;
    z-index: 9996;
    border-radius: ${width*0.1}px;
  `;

  const StyledText = styled(Animated.Text)`
    color: white;
    padding-top: ${height * 0.03};
    padding-left: ${width * 0.05};
    padding-right: ${width * 0.05};
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${width* 0.075}px;
    font-family: 'KochAltschrift';
  `;

  const StyledCenterButton = styled.View`
    position: relative;
    top: ${height * 0.01};
    left: ${width * 0.15};
  `;

  return (
    <>
      {(componentState !== TransitionMessageComponentStates.HIDDEN) &&
        <>
          <StyledFullScreenView />
          {opacity > 0 && 
            <StyledMessageContainer>
              <StyledText style={{ opacity: textOpacity }}>
                Angelo was captured by the acolytes and taken to the Hall of Sages, waiting Mortimer to send him to the Dungeon
              </StyledText>
              <StyledCenterButton>
                <Button buttonText="Go see Angelo" onPress={changeToSchoolMap} />
              </StyledCenterButton>
            </StyledMessageContainer>
          }
        </>
      }
    </>
  );
}