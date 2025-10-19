import React from 'react';
import styled from 'styled-components/native';
import ScreenNavigation from "./ScreenNavigation";

const Container = styled.View`
  height: 100%;
`;

const Main = () => {

    return (
        <Container>
            <ScreenNavigation />
        </Container>
    );
};

export default Main;
