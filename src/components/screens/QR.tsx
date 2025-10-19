import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { ModalContext } from '../../helpers/interfaces/MoldalContext';
import Button from '../Button';
import React from 'react';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 570px
`;

const QRCode = () => {
//   const { setUser } = useContext(UserContext);
  const setModalMessage = useContext(ModalContext)!;

  async function showQR() {
    // await GoogleAuth.signOut();
    // setUser(null);
    setModalMessage('Add functionality to open QR code');
  }

  return (
    <Container>
      <Button
        onPress={showQR}
        buttonText={'show qr'}
      />
    </Container>
  );
};

export default QRCode;

