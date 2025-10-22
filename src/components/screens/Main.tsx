import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../../helpers/contexts/contexts';
import AcolyteNavigation from './role/acolyte/AcolyteNavigation';
import IstvanNavigation from './role/istvan/IstvanNavigation';
import { Roles } from '../../helpers/constants/constants';
import { Text } from 'react-native';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const userContext = useContext(UserContext);

  if (!userContext) return <Text>User context is null at Home Component!!!"</Text>;

  const [user, setUser] = userContext;

 
  const roles = () => {

  switch (user.rol) {
    case (Roles.ISTVAN):
      return (<IstvanNavigation />);

    case (Roles.ACOLYTE):
      return (<AcolyteNavigation />);

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
