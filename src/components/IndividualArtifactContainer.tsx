import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const IndividualArtifactContainer = ({ artifact }: any) => {
  if (!artifact) return;

  // --- STATES && CONSTANTS  --- //
  const [state] = useState(artifact.state);
  const { width, height } = useWindowDimensions();
  const artifactImage = { uri: artifact.image };


  // --- STYLE COMPONENTS --- //
  const componentWidth = width * 0.2;
  const componentHeight = width * 0.2;
  const imageSize = componentHeight * 0.9;

  const ComponentContainer = styled.View`
    border: 1px solid rgba(47, 0, 75, 1);
    border-radius: 8px;
    background: rgba(0,0,0,0.6);
    width: ${componentWidth}px;
    height: ${componentHeight}px;
    justify-content: center;
    align-items: center;
    margin: ${ width * 0.011 }px ${ width * 0.028 }px ${ width * 0.03 }px ${ width * 0.0126 }px;
  `;

  const AcolyteImage = styled.Image`
    height: ${imageSize}px;
    width: ${imageSize}px;
    border: 1px solid rgba(48, 0, 88, 1);
    position: absolute;
  `;

  return (
    <ComponentContainer>
      {state === 'collected' && <AcolyteImage source={artifactImage} />}
    </ComponentContainer>
  );
};

export default IndividualArtifactContainer;
