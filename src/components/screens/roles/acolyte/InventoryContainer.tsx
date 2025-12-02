import React, { useContext, useEffect, useState } from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components/native";
import { AllAcolytesContext, InventoryContext, MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import Artifact from "../../../../helpers/interfaces/Artifact";
import IndividualArtifactContainer from "./IndividualArtifactContainer";

export default function InventoryContainer(artifacts: any) {
  // --- CONTEXTS --- ///
  const allAcolytesContext = useContext(AllAcolytesContext);
  const inventoryContext = useContext(InventoryContext);
  const initialScreenContext = useContext(MortimerInitialScreenContext);

  if (!allAcolytesContext) return <Text>User context is null at Home Component!!!"</Text>;
  if (!inventoryContext) return null;
  if (!initialScreenContext) return null;

  const [isInventoryOpen] = inventoryContext;
  if (!isInventoryOpen) return null;

  // --- STATES --- //
  const [screen, setScreen] = useState(Dimensions.get("window"));

  // --- EFFECTS --- //
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });

    return () => subscription.remove();
  }, []);

  const { width, height } = screen;

  // --- STYLES --- //
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