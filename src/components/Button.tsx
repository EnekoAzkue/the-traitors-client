import React from "react";
import { ButtonProps } from "../helpers/interfaces/components/ButtonInterfaces";
import { Images } from "../helpers/constants/constants";
import { useScreenDimensions } from "../helpers/stores/useScreenDimensionsStore";
import { getButtonStyledComponents } from "../componentStyles/ButtonStyles";


const Button = ({ buttonText, onPress }: ButtonProps) => {
    // Screen Dimensions
    const screenDimensions = useScreenDimensions(state => state.screenDimensions);
    if (!screenDimensions) return;

      // --- BUTTON STYLED COMPONENTS --- //
    const StyledComponents = getButtonStyledComponents(screenDimensions);

    return (
        <>
            <StyledComponents.ButtonContainer onPress={onPress}>
                <StyledComponents.StyledButtonImage source={Images.BUTTON} resizeMode="contain">
                    <StyledComponents.ButtonStyledText>{buttonText}</StyledComponents.ButtonStyledText>
                </StyledComponents.StyledButtonImage>
            </StyledComponents.ButtonContainer>
        </>
    );
}

export default Button;