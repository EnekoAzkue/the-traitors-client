import styled from 'styled-components/native';
import { useContext } from 'react';
import { ModalContext } from '../../helpers/contexts/contexts';
import Button from '../Button';
import React from 'react';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 570px
`;

const ScanQR = () => {
//   const { setUser } = useContext(UserContext);
  const setModalMessage = useContext(ModalContext)!;

  async function openCamera() {
    // await GoogleAuth.signOut();
    // setUser(null);
    setModalMessage('Add functionality to open camera');
  }

  return (
    <Container>
      <Button
        onPress={openCamera}
        buttonText={'open camera'}
      />
    </Container>
  );
};

export default ScanQR;

