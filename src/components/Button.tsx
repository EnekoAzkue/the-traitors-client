import styled from "styled-components/native";
import React from "react";
import { ButtonProps } from "../helpers/interfaces/ButtonInterfaces";
import { ImageBackground, Dimensions } from "react-native";
import { Images } from "../helpers/constants/constants";

// Obtenemos las dimensiones de la pantalla una vez
const { width, height } = Dimensions.get("window");

// Calculamos tamaños proporcionales
const BUTTON_WIDTH = width * 0.5;   // 50% del ancho de pantalla
const BUTTON_HEIGHT = height * 0.15; // 10% del alto de pantalla
const FONT_SIZE = width * 0.06;     // texto proporcional al ancho

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${BUTTON_WIDTH}px;
  height: ${BUTTON_HEIGHT}px;
  position: absolute;
  bottom: 50px; 
  align-self: center; 
`;


const ButtonStyledText = styled.Text`
  color: white;
  font-size: ${FONT_SIZE}px;
  font-family: 'KochAltschrift';
`;

const Button = ({ buttonText, onPress }: ButtonProps) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ImageBackground
        source={Images.BUTTON}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonStyledText>{buttonText}</ButtonStyledText>
      </ImageBackground>
    </ButtonContainer>
  );
};

export default Button;
