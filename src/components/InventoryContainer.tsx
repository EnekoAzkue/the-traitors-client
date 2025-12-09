import React, { useContext } from "react";
import { Text, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { AllAcolytesContext, InventoryContext, MortimerInitialScreenContext } from "../helpers/contexts/contexts";
import Artifact from "../helpers/interfaces/Artifact";
import IndividualArtifactContainer from "./IndividualArtifactContainer";
import { useUserStore } from "../helpers/stores/useUserStore";
import { Roles } from "../helpers/constants/constants";

export default function InventoryContainer(artifacts: any) {

  // --- CONTEXTS && CONSTANTS --- ///
  const { width, height }     = useWindowDimensions();
  const user                  = useUserStore( state => state.user)
  const allAcolytesContext    = useContext(AllAcolytesContext);
  const inventoryContext      = useContext(InventoryContext);
  const initialScreenContext  = useContext(MortimerInitialScreenContext);

  if (!user)                  return <Text>User context is null at Home Component!!!"</Text>; 
  if (!allAcolytesContext)    return <Text>null at Home Component!!!"</Text>;
  if (!inventoryContext)      return <Text>Not valid inventory context!!!"</Text>;
  if (!initialScreenContext)  return <Text>Not valid initial Screen context!!!"</Text>;

  const isInventoryOpen = inventoryContext[1];

  if (!isInventoryOpen) return;

  // --- STYLED COMPONENTS --- //
  const InventoryContainerStyled = styled.View`
    align-items: center; 
    flex: 1; 
    width: ${width}px;
    height: ${ width * 0.23}px;
    margin-top: ${height * 0.88}px;
    position: absolute;
    top: ${(user.rol === Roles.ACOLYTE) ? (- height * 0.001) : (- height* 0.09)};
    z-index: 500;
  `;

  const ArtifactContainer = styled.View`
    flex: 1;
    flex-direction: row;
    width: ${width * 0.95}px;
    height: ${height * 0.2}px;
    border: 1px solid rgba(85, 0, 134, 1);
    border-radius: 8px;
    background-color: rgba(0,0,0,0.3);
  `;

  return (
    <InventoryContainerStyled>
      <ArtifactContainer>
        {artifacts.artifacts.map((artifact: Artifact) => {return <IndividualArtifactContainer key={artifact.name} artifact={artifact} />})}
      </ArtifactContainer>
    </InventoryContainerStyled>
  );
}