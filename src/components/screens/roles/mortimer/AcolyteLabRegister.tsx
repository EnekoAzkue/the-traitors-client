import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";


// --- INTERFACES --- 
import { AcolyteLabRegisterProps } from "../../../../helpers/interfaces/AcolyteLabRegisterProps";

// --- IMAGES ---
import padlockImage from '../../../../assets/images/Block_Acolyte_1.png';
import { socket } from "../../../../helpers/socket/socket";
import { SocketServerToClientEvents } from "../../../../helpers/constants/constants";




const AcolyteLabRegister = ({ acolyte }: AcolyteLabRegisterProps) => {
  const [isInside, setIsInside] = useState(acolyte.isInside);

  const ComponetContainer = styled.View`
  border: 1px solid rgba(134, 65, 0, 1);
  border-radius: 6px;
  background: rgba(0,0,0,0.5);

  margin: 2%;

  width: 90%;
  height: 80px;
  ${(!isInside) ? 'filter: grayscale(100%);' : ''}
`;

  const StyledView = styled.View`
    flex:1;
  `;

  const AcolyteImage = styled.Image`
    height: 60px;
    width: 60px;
    border-radius: 999px;

    border: 1px solid rgba(48, 0, 88, 1);
    position: relative;
    top: 8px;
    left: 250px;
  `;

  const PadlockImage = styled.Image`
    height: 60px;
    width: 60px;

    position: absolute;
    left: 140px;
    top: 12px;
    zIndex: 1;
  `;


  const StyledAcolyteName = styled.Text`
    color: rgba(255, 255, 255, 1);
    fontFamily: "KochAltschrift";
    fontSize: ${(acolyte.name.length < 22) ? (`20`) : (`18`)}px;

    position: relative;
    margin: 0 0 0 5px;
  `;

  const StyledAcolyteClass = styled.Text`
     color: rgba(4, 124, 20, 1);
    fontFamily: "KochAltschrift";
    fontSize: 15px;
    margin: 0 0 0 12px;
    position: relative;

  `;

  const StyledAcolyteGold = styled.Text`
     color: rgba(224, 211, 31, 1);
    fontFamily: "KochAltschrift";
    fontSize: 15px;
    margin: 0 0 0 12px;
    position: relative;

  `;

  const acolytePhoto = { uri: `${acolyte.avatar}` }
  return (
    <>

      <ComponetContainer>
        {/* TODO: Fix css of padlock image to can be placed at the center of the Acolyte register component. */}
        {/* {(isInside) ? <PadlockImage source={padlockImage} resizeMode="contain" /> : <></>} */}

        <StyledView>
          <AcolyteImage source={acolytePhoto}></AcolyteImage>
        </StyledView>


        <StyledAcolyteName>{acolyte.nickname}</StyledAcolyteName>
        <StyledAcolyteGold>Gold: <Text style={{ color: 'white' }}>{acolyte.gold}</Text> coins.</StyledAcolyteGold>
        <StyledAcolyteGold>Level: <Text style={{ color: 'white' }}>{acolyte.level}</Text></StyledAcolyteGold>

        <StyledAcolyteClass>Class: {acolyte.profile.name}</StyledAcolyteClass>
      </ComponetContainer>
    </>
  );
}

export default AcolyteLabRegister;