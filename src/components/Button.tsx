import styled from "styled-components/native";
import React from "react";
import { ButtonProps } from "../helpers/interfaces/components/ButtonInterfaces";
import { ImageBackground } from "react-native";
import { Images } from "../helpers/constants/constants";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ButtonContainer = styled.TouchableOpacity`
    justify-content: center;
    width: ${width * 0.5}px;
    height: ${height * 0.15}px;
    position: absolute;
    top: 75%;
`;

const ButtonStyledText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    position: relative;
    top: 38%;
    fontFamily: 'KochAltschrift';
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