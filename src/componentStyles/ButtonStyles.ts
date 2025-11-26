import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getButtonStyledComponents(screenDimensions: ScaledSize) {

  const ButtonContainer = styled.TouchableOpacity`
    position: absolute;
    width: ${screenDimensions.width * 0.5}px;
    height: ${screenDimensions.height * 0.15}px;
    top: ${screenDimensions.height * 0.75}px;
    left: ${screenDimensions.width * 0.133}px;
`;

  const ButtonStyledText = styled.Text`
    color: white;
    font-size: ${screenDimensions.width * 0.077}px;
    fontFamily: 'KochAltschrift';
`;

  const StyledButtonImage = styled.ImageBackground`
    width: ${screenDimensions.width * 0.75}px;
    height: ${screenDimensions.height * 0.15}px;
    align-items: center;
    justify-content: center;
`;

  return { ButtonContainer, ButtonStyledText, StyledButtonImage };
}