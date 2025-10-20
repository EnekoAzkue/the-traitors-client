import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { ModalContext, UserContext } from '../../helpers/contexts/contexts';
import Button from '../Button';
import React from 'react';


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { signOut } from '../../helpers/googleSignInUtils/googleSignInUtils';


const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 570px
`;

const Logout = () => {

  const setModalMessage = useContext(ModalContext)!;

  const  userContext = useContext(UserContext);

  if (!userContext){
    throw Error("Error! User Context failed at Logout component.");
  }
  
  const [user, setUser] = userContext;

  async function logOut() {
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

