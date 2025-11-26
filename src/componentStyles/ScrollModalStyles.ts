import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getScrollModalStyledComponents(screenDimensions: ScaledSize) {
  const Container = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
  `;

  const BackgroundImage = styled.ImageBackground`
    width: ${screenDimensions.width * 0.9}px;
    height: ${screenDimensions.height}px;
  `;

  const Content = styled.View`
    height: 80%;
    justify-content: center;
    align-items: center;
    row-gap: ${screenDimensions.height * 0.02}px;
    padding-block-start: ${screenDimensions.height * 0.1}px;
  `;

  const Message = styled.Text`
    padding-inline: ${screenDimensions.width * 0.2}px;
    text-align: center;
    fontFamily: 'KochAltschrift';

    font-size: ${Math.min(screenDimensions.width * 0.07, 30)}px;
  `;

  const AcceptButton = styled.Pressable`
    border-radius: 10px;
    padding: ${screenDimensions.width * 0.05}px ${screenDimensions.width * 0.1}px;
    filter: drop-shadow(0 0 5px rgb(0 0 0));
    background-color: rgb(0 0 0 / 0.65);
    position: absolute;
    margin-top: ${screenDimensions.height * 0.4}px;
  `;

  const AcceptButtonText = styled(Message)`
    padding: 0;
    color: rgb(177 164 144);
    fontFamily: 'KochAltschrift';
    font-size: ${Math.min(screenDimensions.width * 0.06, 28)}px;
  `;
  return { Container, BackgroundImage, Content, Message, AcceptButton, AcceptButtonText };
}