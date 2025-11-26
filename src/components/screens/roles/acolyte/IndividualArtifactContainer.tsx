import React, { useState, useEffect } from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components/native";
import { ArtifactListProps } from "../../../../helpers/interfaces/ArtifactListProps";

const IndividualArtifactContainer = ({ artifact }: any) => {
    if (!artifact) return
    const [state, setState] = useState(artifact.state);

    const [screen, setScreen] = useState(Dimensions.get("window"));
    useEffect(() => {
        const sub = Dimensions.addEventListener("change", ({ window }) => {
            setScreen(window);
        });
        return () => sub.remove();
    }, []);

    const { width, height } = screen;

    const componentWidth = height * 0.1;
    const componentHeight = height * 0.1;
    const imageSize = componentHeight * 0.9;

    const ComponentContainer = styled.View`
    border: 1px solid rgba(47, 0, 75, 1);
    border-radius: 8px;
    background: rgba(0,0,0,0.6);
    margin-vertical: 8px;
    width: ${componentWidth}px;
    height: ${componentHeight}px;
    justify-content: center;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    margin: 5px 5px 5px 5px;
  `;

    const AcolyteImage = styled.Image`
    height: ${imageSize}px;
    width: ${imageSize}px;
    border: 1px solid rgba(48, 0, 88, 1);
    position: absolute;
  `;


    const acolytePhoto = { uri: artifact.image };

    return (
        <ComponentContainer>
            {state === 'collected' &&
                <AcolyteImage source={acolytePhoto} />

            }
        </ComponentContainer>
    );
};

export default IndividualArtifactContainer;
