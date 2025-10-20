import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { ModalContext } from '../../helpers/contexts/contexts';
import Button from '../Button';
import React from 'react';


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';


const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 570px
`;

const Logout = () => {

//   const { setUser } = useContext(UserContext);
  const setModalMessage = useContext(ModalContext)!;

  async function logOut() {
    // await GoogleAuth.signOut();
    // setUser(null);
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

