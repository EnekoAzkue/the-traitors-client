import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";


// --- INTERFACES --- 
import { AcolyteLabRegisterProps } from "../../../../helpers/interfaces/AcolyteLabRegisterProps";

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



const AcolyteLabRegister = ({ acolyte }: AcolyteLabRegisterProps) => {
  const [isInside, setIsInside] = useState(acolyte.isInside);

  const ComponetContainer = styled.View`
  border: 1px solid rgba(134, 65, 0, 1);
  border-radius: 6px;
  background: rgba(0,0,0,0.5);
  margin: ${height * 0.004}%;
  width: ${width * 0.23}%;
  height: ${height * 0.15};
  ${(!isInside) ? 'filter: grayscale(100%);' : ''}
`;


  const AcolyteImage = styled.Image`
    height: ${height * 0.1}%;
    width: ${width * 0.08}%;
    border-radius: 999px;

    border: 1px solid rgba(48, 0, 88, 1);
    position: absolute;
    top: ${height * 0.008}%;
    left: ${width * 0.16}%;
  `;


  const baseFont = width * 0.065; 

const StyledAcolyteName = styled.Text.attrs({
  numberOfLines: 1,
  adjustsFontSizeToFit: true,
  minimumFontScale: 0.7,
})`
  color: rgba(255, 255, 255, 1);
  font-family: "KochAltschrift";
  position: relative;
  margin: 0 0 0 5px;
  font-size: ${baseFont}px;
`;



  const StyledAcolyteClass = styled.Text`
     color: rgba(4, 124, 20, 1);
    fontFamily: "KochAltschrift";
    fontSize: ${baseFont}px;
    margin: 0 0 0 12px;
    position: relative;

  `;

  const StyledAcolyteGold = styled.Text`
     color: rgba(224, 211, 31, 1);
    fontFamily: "KochAltschrift";
    fontSize: ${baseFont}px;
    margin: 0 0 0 12px;
    position: relative;

  `;

  const acolytePhoto = { uri: `${acolyte.avatar}` }
  return (
    <>

      <ComponetContainer>
        <AcolyteImage source={acolytePhoto}></AcolyteImage>
        <StyledAcolyteName>{acolyte.nickname}</StyledAcolyteName>
        <StyledAcolyteGold>Gold: <Text style={{ color: 'white' }}>{acolyte.gold}</Text> coins.</StyledAcolyteGold>
        <StyledAcolyteGold>Level: <Text style={{ color: 'white' }}>{acolyte.level}</Text></StyledAcolyteGold>

        <StyledAcolyteClass>Class: {acolyte.profile.name}</StyledAcolyteClass>
      </ComponetContainer>
    </>
  );
}

export default AcolyteLabRegister;