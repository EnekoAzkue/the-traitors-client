import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";


// --- INTERFACES --- 
import { AcolyteTowerRegisterProps } from "../../../../helpers/interfaces/AcolyteTowerRegisterProps";

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');




const AcolyteTowerRegister = ({ acolyte }: AcolyteTowerRegisterProps) => {
  const [insideTower, setInsideTower] = useState(acolyte.insideTower);
  const ComponetContainer = styled.View`
  border: 1px solid rgba(47, 0, 75, 1);
  border-radius: 6px;
  background: rgba(0,0,0,0.5);
  margin: ${height * 0.004}%;
  width: ${width * 0.23}%;
  height: ${height * 0.15};
  ${(!insideTower) ? 'filter: grayscale(100%);' : ''}
`;

  const StyledView = styled.View`
    flex:1;
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
        {/* TODO: Fix css of padlock image to can be placed at the center of the Acolyte register component. */}
        {/* {(insideTower) ? <PadlockImage source={padlockImage} resizeMode="contain" /> : <></>} */}

          <AcolyteImage source={acolytePhoto}></AcolyteImage>
        <StyledAcolyteName>{acolyte.nickname}</StyledAcolyteName>
        <StyledAcolyteGold>Gold: <Text style={{ color: 'white' }}>{acolyte.gold}</Text> coins.</StyledAcolyteGold>
        <StyledAcolyteGold>Level: <Text style={{ color: 'white' }}>{acolyte.level}</Text></StyledAcolyteGold>

        <StyledAcolyteClass>Class: {acolyte.profile.name}</StyledAcolyteClass>
      </ComponetContainer>
    </>
  );
}

export default AcolyteTowerRegister;