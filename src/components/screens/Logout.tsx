import Button from '../Button';
import React from 'react';
import styled from 'styled-components/native';
import { signOut } from '../../helpers/googleSignInUtils/googleSignInUtils';
import { performSocketCleanUp } from '../../helpers/socket/socket';
import { useGeneralModalStore } from '../../helpers/stores/useGeneralModalStore';
import { useUserStore } from '../../helpers/stores/useUserStore';
import { useScreenDimensions } from '../../helpers/stores/useScreenDimensionsStore';
import { useAcolyteInitialScreenStore } from '../../helpers/stores/useAcolyteInitialScreenStore';

const Logout = () => {
  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;
  
  const {user, setUser} = useUserStore();
  if (!user) return;


  const setAcolyteInitialScreen = useAcolyteInitialScreenStore( state => state.setAcolyteInitialScreen);

  const {setModalMessage} = useGeneralModalStore();


  const Container = styled.View`
    height: ${screenDimensions.height}px;
    width: ${screenDimensions.width}px;
  `;

  async function logOut() {
    if(user){
      setAcolyteInitialScreen(null);
      performSocketCleanUp(user.email); // Borrar conexión de sockets 
      await signOut();
      setUser(null);
      setModalMessage('The gate closes behind you.\nSession over.');
    }
  }

  return (
    <Container>
      <Button onPress={logOut} buttonText={'Log out'} />
    </Container>
  );
};

export default Logout;

