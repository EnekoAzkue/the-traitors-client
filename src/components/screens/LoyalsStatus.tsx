import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, useWindowDimensions } from "react-native";
import { AcolyteStatusProps } from "../../helpers/interfaces/components/AcolyteStatusProps";
import IconButton from "../IconButton";
import { Images } from "../../helpers/constants/constants";

const AcolyteTowerRegister = ({ acolyte, setShowModal, setSelectedAcolyte }: AcolyteStatusProps) => {

  if(!acolyte) return null

  // --- STATES--- //
  

  // --- CONSTANTS --- //
  const { width, height } = useWindowDimensions();
  const acolytePhoto = { uri: acolyte.avatar };

  // --- STYLED COMPONENTS --- //
  const componentWidth = Math.min(width * 0.9, 400); 
  const componentHeight = height * 0.25;
  const imageSize = componentHeight * 0.5;
  const baseFont = componentHeight * 0.2;

  const ComponentContainer = styled.View`
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin-vertical: 8px;
    width: ${componentWidth * 0.9}px;
    height: ${componentHeight * 0.9}px;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
  `;

  const AcolyteImage = styled.Image`
    height: ${imageSize}px;
    width: ${imageSize}px;
    border-radius: ${imageSize / 2}px;
    border: 1px solid rgba(255, 255, 255, 1);
    right: 16px;
    margin: 15px 15px;
  `;

  const StyledAcolyteName = styled.Text.attrs({
    numberOfLines: 1,
    adjustsFontSizeToFit: true,
    minimumFontScale: 0.7,
  })`
    color: white;
    font-family: "KochAltschrift";
    font-size: ${baseFont}px;
  `;

  const ButtonContainer = styled.View`
    position: absolute;
    width: ${componentWidth * 0.4};
    height: 100px;
    left: 50%;
    top: 30%;
  `

  const Modal = styled.View`

  `
  
  const modalToggle = () => {
    setShowModal(true)
    setSelectedAcolyte(acolyte)
  }


  return (
    <ComponentContainer>
      <AcolyteImage source={acolytePhoto} />
      <StyledAcolyteName>{acolyte.nickname}</StyledAcolyteName>
      <ButtonContainer>
        <IconButton backgroundImage={Images.ILLNESS_ICON} width={width * 0.1} height={width * 0.1} xPos={width * 0}    yPos={-height * 0.01} buttonOnPress={modalToggle} hasBorder={true} hasBrightness={acolyte.disease.length > 0} iconText="Ill"/>
        <IconButton backgroundImage={Images.CURSED_ICON}  width={width * 0.1} height={width * 0.1} xPos={width * 0.15} yPos={-height * 0.01} buttonOnPress={modalToggle} hasBorder={true} hasBrightness={acolyte.isCursed}           iconText="Cursed"/>
        <IconButton backgroundImage={Images.TIRED_ICON}   width={width * 0.1} height={width * 0.1} xPos={width * 0.30} yPos={-height * 0.01} buttonOnPress={modalToggle} hasBorder={true} hasBrightness={acolyte.resistance < 30}    iconText="Tired"/>
      </ButtonContainer>
    </ComponentContainer> 
  );

};

export default AcolyteTowerRegister;