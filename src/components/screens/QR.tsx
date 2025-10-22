import styled from 'styled-components/native';
import { useContext, useState } from 'react';
import { ModalContext, UserContext } from '../../helpers/contexts/contexts';
import Button from '../Button';
import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Text } from 'react-native';
import { ApiEndpoints, Images } from '../../helpers/constants/constants';
import { ImageBackground } from 'react-native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const QRCodeContainer = () => {

  const [showingQR, setShowingQR] = useState<boolean>(false)

  const setModalMessage = useContext(ModalContext)!;
  const userContext = useContext(UserContext);

  if (!userContext) return <Text>User context is null at QR Component!!!"</Text>;

  const [user, setUser] = userContext;

  async function showQR() {
    setShowingQR(!showingQR);
  }


  // TODO (REFACTOR): Move all this styled components to their own directory

  const StyledQRTextContainer = styled.View`
    border: 1px solid orange;
    border-radius: 8px;
    height: 80px;
    width: 320px;
    background: rgba(0,0,0, 0.5);
    margin: 0px 0px 80px 0px;
  `;

  const StyledQRText = styled.Text`
    color: white;
    fontFamily: 'KochAltschrift';
    fontSize: 20px;   
    text-align: center;
    `;

  const ButtonContainer = styled.TouchableHighlight`
    justify-content: center;
    width: 200px;
    height: 120px;
  `;

  const ButtonText = styled.Text`
    color: white;
    text-align: center;
    fontFamily: 'KochAltschrift';
    fontSize: 20px;
    position: relative;
    top: 38%
  `;

  // REFACTOR: DELETE THIS 
  let logoFromFile = Images.LOGO;

  return (

    (!showingQR) ?
      <Container>
        <Text style={{ color: 'white', fontFamily: 'KochAltschrift', fontSize: 20 }}>Show the Rune!</Text>
        <Button onPress={showQR} buttonText={'Are you sure?'} />

        <ButtonContainer onPress={showQR}>
          <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: "100%", height: "100%", alignItems: "center" }} >
            <ButtonText>{'Are you sure?'}</ButtonText>
          </ImageBackground>
        </ButtonContainer>
      </Container>
      :
      <>
        <Container>
          <StyledQRTextContainer>
            <StyledQRText>Observe the rune and you will be worthy in Angelo's eyes.</StyledQRText>
          </StyledQRTextContainer>
          <View>
            <QRCode value={`${user.email}`} logo={Images.LOGO} size={200} />
          </View>

          <ButtonContainer onPress={showQR}>
            <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: "100%", height: "100%", alignItems: "center" }} >
              <ButtonText>{'Hide the rune'}</ButtonText>
            </ImageBackground>

          </ButtonContainer>
        </Container>

      </>
  );
};

export default QRCodeContainer;

