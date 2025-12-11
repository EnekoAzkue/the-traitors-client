import styled from 'styled-components/native';
import { useState } from 'react';
import Button from '../Button';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text, useWindowDimensions } from 'react-native';
import { Images } from '../../helpers/constants/constants';
import { useUserStore } from '../../helpers/stores/useUserStore';



const QRCodeContainer = () => {

  // --- STATES, STORES && CONSTANTS --- //
  const [showingQR, setShowingQR] = useState<boolean>(false)

  const user = useUserStore( state => state.user );

  if ( !user ) return <Text>User context is null at QR Component!!!"</Text>;

  const { width, height } = useWindowDimensions();

  // --- FUNCTIONS --- //
  async function showQR() {
    setShowingQR(!showingQR);
  }

  // --- STYLED COMPONENTS --- //
  // TODO (REFACTOR): Move all this styled components to their own directory
  const StyledQRTextContainer = styled.View`
    border: ${width * 0.002}px solid orange;
    border-radius: 8px;
    width: ${width * 0.75}px;    
    height: ${height * 0.1}px;  
    background: rgba(0,0,0, 0.5);
    margin: 0px 0px ${height * 0.08}px 0px;
  `;

  const StyledQRText = styled.Text`
    color: white;
    fontFamily: 'KochAltschrift';
    font-size: ${width * 0.07}px;
    text-align: center;
    `;

  const QRContainer = styled.View`
    background: rgba(77, 208, 212, 1);
    border-radius: 2px;
    border: 3px solid rgba(255, 255, 255, 1);
    width: 55%;
    height: 26%;
    justify-content: center;
    align-items: center;
  `;

  // REFACTOR: DELETE THIS 
  let logoFromFile = Images.LOGO;

  const StyledText_1 = styled.Text`
    color: white;
    fontFamily: 'KochAltschrift';
    font-size: ${width * 0.1}px;
  `;


  const Container = styled.View`
    justify-content: center;
    align-items: center;
    height: ${height}px;
    width: ${width}px;
  `;


  return (

    (!showingQR) ?
      <Container>
        <StyledText_1>Show the Rune!</StyledText_1>
        <Button onPress={showQR} buttonText={'Are you sure?'} />
      </Container>
      :
      <>
        <Container>
          <StyledQRTextContainer>
            <StyledQRText>Observe the rune and you will be worthy in Angelo's eyes.</StyledQRText>
          </StyledQRTextContainer>
          <QRContainer>
            <QRCode value={`${user.email}`} logo={Images.LOGO} size={200} />
          </QRContainer>


          <Button onPress={showQR} buttonText={'Hide the rune'} />


        </Container>

      </>
  );
};

export default QRCodeContainer;

