import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { MortimerToastTextContext } from '../../helpers/contexts/contexts';
import IstvanNavigation from './roles/istvan/IstvanNavigation';
import { Roles } from '../../helpers/constants/constants';
import { Text } from 'react-native';
import MortimerNavigation from './roles/mortimer/MortimerNavigation';
import VillainNavigation from './roles/villain/VillainNavigation';
import Acolyte from './roles/acolyte/Acolyte';
import { useUserStore } from '../../helpers/stores/useUserStore';
import AcolyteNavigation from './roles/acolyte/AcolyteNavigation';

const Main = () => {

  // --- STORES && CONSTANTS --- //
  const user = useUserStore( state => state.user);

  if (!user) return <Text>User is null at Main Component!!!"</Text>;

  const mortimerToastTextContext = useContext(MortimerToastTextContext);
  if (!mortimerToastTextContext) return;

  const roles = () => {
    switch (user.rol) {
      case (Roles.ISTVAN):
        return (<IstvanNavigation />);

      case (Roles.ACOLYTE):
        return (<AcolyteNavigation />);

      case (Roles.VILLAIN):
        return (<VillainNavigation />);

      case (Roles.MORTIMER):
        return (<MortimerNavigation />);

      default:
        return (<Text>{`Error! Rol: ${user.rol} Not found`}</Text>)
    }
  }

  // --- STYLED COMPONENTS --- //
  const Container = styled.View`
    height: 100%;
  `;

  return (
    <Container>
      {roles()}
    </Container>
  );

};

export default Main;
