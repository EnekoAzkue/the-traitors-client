import React, { useContext, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { AcolyteInitialScreenContext } from "../helpers/contexts/contexts";
import Button from "./Button";
import { Screens } from "../helpers/constants/constants";
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
  const {isTransitionMessageShowing, setIsTransitionMessageShowing} = useTransitionMessageShowingStore(state => state);
  const [componentState, setComponentState] = useState(TransitionMessageComponentStates.HIDDEN);

  useEffect(() => {
    console.log("Component loaded");
    if (isTransitionMessageShowing) setComponentState(TransitionMessageComponentStates.SHOWING);
    else setComponentState(TransitionMessageComponentStates.HIDDEN);
  } , []);

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
    background-color: rgb(21, 107, 71);
    border : 1px solid white;
    position: absolute;
    top: ${height * 0.2}px;
    left: ${width * 0.1}px;
    z-index: 9996;
    border-radius: ${width*0.1}px;
  `;

  const StyledText = styled.Text`
    color: white;
    padding-top: ${height * 0.06};
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
    top: ${height * 0.05};
    left: ${width * 0.15};
  `;

  return (
    <>

    {(componentState !== TransitionMessageComponentStates.HIDDEN) &&
      <>
        <StyledFullScreenView />
        {opacity > 0 && 
          <StyledMessageContainer>
          <StyledText>Angelo was imprisoned by the acolytes and taken from the tavern to the dungeon</StyledText>
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