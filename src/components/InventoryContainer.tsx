import React, { useContext } from "react";
import { Text, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { AllAcolytesContext, InventoryContext, MortimerInitialScreenContext } from "../helpers/contexts/contexts";
import Artifact from "../helpers/interfaces/Artifact";
import IndividualArtifactContainer from "./IndividualArtifactContainer";

export default function InventoryContainer(artifacts: any) {

  // --- CONTEXTS && CONSTANTS --- ///
  const { width, height }     = useWindowDimensions();
  const allAcolytesContext    = useContext(AllAcolytesContext);
  const inventoryContext      = useContext(InventoryContext);
  const initialScreenContext  = useContext(MortimerInitialScreenContext);

  if (!allAcolytesContext)    return <Text>User context is null at Home Component!!!"</Text>;
  if (!inventoryContext)      return <Text>Not valid inventory context!!!"</Text>;
  if (!initialScreenContext)  return <Text>Not valid initial Screen context!!!"</Text>;

  const isInventoryOpen = inventoryContext[1];

  if (!isInventoryOpen) return;

  // --- STYLED COMPONENTS --- //
  const InventoryContainerStyled = styled.View`
    align-items: center; 
    flex: 1; 
    width: ${width}px;
    height: ${height * 0.115}px;
    margin-top: ${height * 0.88}px;
    position: absolute;
    z-index: 500;
  `;

  const ArtifactContainer = styled.ScrollView`
    flex: 1;
    width: ${width * 0.95}px;
    height: ${height * 0.1}px;
    border: 1px solid rgba(85, 0, 134, 1);
    border-radius: 8px;
    background-color: rgba(0,0,0,0.3);
  `;

  return (
    <InventoryContainerStyled>
      <ArtifactContainer horizontal={true}>
        {artifacts.artifacts.map((artifact: Artifact) => {return <IndividualArtifactContainer key={artifact.name} artifact={artifact} />})}
      </ArtifactContainer>
    </InventoryContainerStyled>
  );
}