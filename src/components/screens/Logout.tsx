import styled from 'styled-components/native';
import { useContext } from 'react';
import { AcolyteInitialScreenContext, ModalContext, UserContext } from '../../helpers/contexts/contexts';
import Button from '../Button';
import React from 'react';

import { signOut } from '../../helpers/googleSignInUtils/googleSignInUtils';
import { performSocketCleanUp } from '../../helpers/socket/socket';


const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logout = () => {

  const screenContext = useContext(AcolyteInitialScreenContext)
  if(!screenContext) return;
  const [initialScreen, setInitialScreen] = screenContext




  const setModalMessage = useContext(ModalContext)!;

  const  userContext = useContext(UserContext);

  if (!userContext) return;
  
  const [user, setUser] = userContext;

  async function logOut() {
    setInitialScreen(null);
    performSocketCleanUp(user.email); // Borrar conexión de sockets 
    await signOut();
    setUser(null);
    setModalMessage('The gate closes behind you.\nSession over.');
  }

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

