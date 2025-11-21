import styled from 'styled-components/native';
import { useContext, useState } from 'react';
import { ModalContext, UserContext } from '../../helpers/contexts/contexts';
import Button from '../Button';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text } from 'react-native';
import { Images } from '../../helpers/constants/constants';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: ${height* 0.15}px;
  width: ${width * 0.27}px;
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
    font-size: ${width * 0.05}px;
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
    font-size: ${width * 0.07}px;
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

