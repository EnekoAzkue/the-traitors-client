import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";
import { AllAcolytesContext, InventoryContext, MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import Artifact from "../../../../helpers/interfaces/Artifact";
import IndividualArtifactContainer from "./IndividualArtifactContainer";

export default function InventoryContainer(artifacts: any) {
    const allAcolytesContext = useContext(AllAcolytesContext);
    const inventoryContext = useContext(InventoryContext);

    if (!allAcolytesContext) return <Text>User context is null at Home Component!!!"</Text>;
    if(!inventoryContext) return null;

    const [acolytes, setAcolytes] = allAcolytesContext;
    const [isInventoryOpen] = inventoryContext;

    const initialScreenContext = useContext(MortimerInitialScreenContext);
    if (!initialScreenContext) return null;
    const [initialScreen, setInitialScreen] = initialScreenContext;

    const [screen, setScreen] = useState(Dimensions.get("window"));

    useEffect(() => {
        setInitialScreen("MortimerTower");
    }, []);

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setScreen(window);
        });

        return () => subscription.remove();
    }, []);

    const { width, height } = screen;

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

    const logAritfactName = (name: string) => {
        console.log(`The name of the artifact inventory is: ${name}`);
    }

    if (!isInventoryOpen) return null;

    return (
        <InventoryContainerStyled>
            <ArtifactContainer horizontal={true}>
                {
                    artifacts.artifacts.map( (a: Artifact) => {
                        logAritfactName(a.name);
                        return <IndividualArtifactContainer key={a.name} artifact={a} />
                    })
                }
            </ArtifactContainer>
        </InventoryContainerStyled>
    );
}
