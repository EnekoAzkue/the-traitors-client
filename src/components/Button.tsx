import styled from "styled-components/native";
import React from "react";
import { ButtonProps } from "../helpers/interfaces/ButtonInterfaces";
import { ImageBackground } from "react-native";
import { Images } from "../helpers/constants/constants";

const ButtonContainer = styled.TouchableHighlight`
    justify-content: center;
    width: 200px;
    height: 120px;
    position: relative;
    top: 75%;
`;

const ButtonStyledText = styled.Text`
    color: white;
    font-size: 16px;
    position: relative;
    top: 42%
`;


const Button = ({ buttonText, onPress }: ButtonProps) => {
    return (
        <>
            <ButtonContainer onPress={onPress}>
                <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: "100%", height:"100%", alignItems: "center"}} >

                    <ButtonStyledText>{buttonText}</ButtonStyledText>
                </ImageBackground>
            </ButtonContainer>

        </>
    );
}

export default Button;