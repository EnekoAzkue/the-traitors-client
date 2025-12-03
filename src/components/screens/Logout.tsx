import React from 'react';
import Button from '../Button';
import { useContext } from 'react';
import styled from 'styled-components/native';
import { AcolyteInitialScreenContext, ModalContext } from '../../helpers/contexts/contexts';
import { signOut } from '../../helpers/googleSignInUtils/googleSignInUtils';
import { performSocketCleanUp } from '../../helpers/socket/socket';
import { useUserStore } from '../../helpers/stores/useUserStore';

const Logout = () => {

  const screenContext = useContext(AcolyteInitialScreenContext)
  const setModalMessage = useContext(ModalContext)!;
  const { user, setUser } = useUserStore(state => state);

  if (!screenContext) return;
  if (!user) return;

  const setInitialScreen = screenContext[1];

  async function logOut() {
    if (user) {
      setInitialScreen(null);
      performSocketCleanUp(user.email); // Borrar conexión de sockets 
      await signOut();
      setUser(null);
      setModalMessage('The gate closes behind you.\nSession over.');
    }
  }

  const Container = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
  `;

  return (
    <Container>
      <Button
        onPress={logOut}
        buttonText={'Log out'}
      />
    </Container>
  );

};

export default Logout;

