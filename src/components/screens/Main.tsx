import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { MortimerInitialScreenContext, MortimerToastTextContext, UserContext } from '../../helpers/contexts/contexts';
import IstvanNavigation from './roles/istvan/IstvanNavigation';
import { Roles } from '../../helpers/constants/constants';
import { Text } from 'react-native';
import MortimerNavigation from './roles/mortimer/MortimerNavigation';
import VillainNavigation from './roles/villain/VillainNavigation';
import Acolyte from './roles/acolyte/Acolyte';
import Toast from '../Toast';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const userContext = useContext(UserContext);
  const screenContext = useContext(MortimerInitialScreenContext);

  const [initialScreen, setInitialScreen] = screenContext!;
  if (!userContext) return <Text>User context is null at Home Component!!!"</Text>;

  const [user, setUser] = userContext;

  const mortimerToastTextContext = useContext(MortimerToastTextContext);
  if (!mortimerToastTextContext) return;
  const [mortimerToastText, setMortimerToastText] = mortimerToastTextContext;



  const roles = () => {

    switch (user.rol) {
      case (Roles.ISTVAN):
        return (<IstvanNavigation />);

      case (Roles.ACOLYTE):
        return (<Acolyte />);

      case (Roles.VILLAIN):
        return (<VillainNavigation />);

      case (Roles.MORTIMER):
        return (
          <>
            <MortimerNavigation />
          </>

        );

      default:
        return (<Text>{`Error! Rol: ${user.rol} Not found`}</Text>)
    }
  }


  return (
    <Container>

      {roles()}
    </Container>
  );
};

export default Main;
