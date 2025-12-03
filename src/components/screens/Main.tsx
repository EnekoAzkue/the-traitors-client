import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { MortimerInitialScreenContext, MortimerToastTextContext } from '../../helpers/contexts/contexts';
import IstvanNavigation from './roles/istvan/IstvanNavigation';
import { Roles } from '../../helpers/constants/constants';
import { Text } from 'react-native';
import MortimerNavigation from './roles/mortimer/MortimerNavigation';
import VillainNavigation from './roles/villain/VillainNavigation';
import Acolyte from './roles/acolyte/Acolyte';
import Toast from '../Toast';
import { useUserStore } from '../../helpers/stores/useUserStore';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const screenContext = useContext(MortimerInitialScreenContext);
  const user = useUserStore( state => state.user);


  const [initialScreen, setInitialScreen] = screenContext!;
  if (!user) return <Text>User is null at Main Component!!!"</Text>;


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
