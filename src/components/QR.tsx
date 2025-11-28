import React from 'react';
import Button from './Button';
import QRCode from 'react-native-qrcode-svg';
import { useState } from 'react';
import { Images } from '../helpers/constants/constants';
import { useUserStore } from '../helpers/stores/useUserStore';
import { getQRStyledComponents } from '../componentStyles/QRStyles';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';

const QRCodeContainer = () => {

  // --- COMPONENT STATES --- //
  const [showingQR, setShowingQR] = useState<boolean>(false);

  // --- ZUSTAND STORES --- //
    // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

    // --- USER --- //
  const {user} = useUserStore();
  if (!user) return;


  async function showQR() {
    setShowingQR(!showingQR);
  }

  // --- BUTTON STYLED COMPONENTS --- //
  const {QRScreenContainer, StyledQRTextContainer, StyledQRText, QRContainer, StyledText_1} = getQRStyledComponents(screenDimensions);

  return (
    (!showingQR) ?
      <QRScreenContainer>
        <StyledText_1>Show the Rune!</StyledText_1>
        <Button onPress={showQR} buttonText={'Are you sure?'} />
      </QRScreenContainer>
      :
      <>
        <QRScreenContainer>
          <StyledQRTextContainer>
            <StyledQRText>Observe the rune and you will be worthy in Angelo's eyes.</StyledQRText>
          </StyledQRTextContainer>
          <QRContainer>
            <QRCode value={`${user.email}`} logo={Images.LOGO} size={200} />
          </QRContainer>
          <Button onPress={showQR} buttonText={'Hide the rune'} />
        </QRScreenContainer>
      </>
  );
};

export default QRCodeContainer;

