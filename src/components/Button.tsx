import React from "react";
import styled from "styled-components/native";
import { Images } from "../helpers/constants/constants";
import { ImageBackground, useWindowDimensions } from "react-native";
import { ButtonProps } from "../helpers/interfaces/components/ButtonInterfaces";

const Button = ({ buttonText, onPress }: ButtonProps) => {

  // --- CONSTNATS --- //
  const { width, height } = useWindowDimensions();

  // --- STYLED COMPONENTS --- //
  const ButtonContainer = styled.TouchableOpacity`
    justify-content: center;
    width: ${width * 0.5}px;
    height: ${height * 0.15}px;
    position: absolute;
    top: 75%;
    zIndex: 900;
  `;

  const ButtonStyledText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    position: relative;
    top: 38%;
    fontFamily: 'KochAltschrift';
  `;

  return (
    <>
      <ButtonContainer onPress={onPress}>
        <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: "100%", height: "100%", alignItems: "center" }} >
          <ButtonStyledText>{buttonText}</ButtonStyledText>
        </ImageBackground>
      </ButtonContainer>
    </>
  );
}

export default Button;