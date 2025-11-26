import Button from './Button';
import React from 'react';
import styled from 'styled-components/native';
import { useGeneralModalStore } from '../helpers/stores/useGeneralModalStore';


const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 570px
`;

const ScanQR = () => {
  // La ! es "Confía en mí, esto no será null ni undefined, aunque TypeScript piense que podría serlo".
  // const setModalMessage = useContext(ModalContext)!;
  const {setModalMessage} = useGeneralModalStore();

  async function openCamera() {
    // await GoogleAuth.signOut();
    // setUser(null);
    setModalMessage('Add functionality to open camera');
  }

  return (
    <Container>
      <Button onPress={openCamera} buttonText={'open camera'}/>
    </Container>
  );
};

export default ScanQR;

