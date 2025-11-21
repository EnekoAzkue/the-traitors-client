import React, { useState, useEffect } from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components/native";
import { AcolyteTowerRegisterProps } from "../../../../helpers/interfaces/AcolyteTowerRegisterProps";

const AcolyteTowerRegister = ({ acolyte }: AcolyteTowerRegisterProps) => {
  const [insideTower, setInsideTower] = useState(acolyte.insideTower);

  const [screen, setScreen] = useState(Dimensions.get("window"));
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => sub.remove();
  }, []);

  const { width, height } = screen;

  // Tamaño del componente más grande y proporcional
  const componentWidth = Math.min(width * 0.9, 400); // ancho máximo 400px
  const componentHeight = height * 0.25; // más alto que antes
  const imageSize = componentHeight * 0.5;
  const baseFont = componentHeight * 0.12;

  const ComponentContainer = styled.View`
    border: 1px solid rgba(47, 0, 75, 1);
    border-radius: 8px;
    background: rgba(0,0,0,0.6);
    margin-vertical: 8px;
    width: ${componentWidth}px;
    height: ${componentHeight}px;
    opacity: ${insideTower ? 1 : 0.5};
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
  `;


  const AcolyteImage = styled.Image`
    height: ${imageSize}px;
    width: ${imageSize}px;
    border-radius: ${imageSize / 2}px;
    border: 1px solid rgba(48, 0, 88, 1);
    position: absolute;
    top: ${componentHeight * 0.15}px;
    right: 16px;
  `;

  const StyledAcolyteName = styled.Text.attrs({
    numberOfLines: 1,
    adjustsFontSizeToFit: true,
    minimumFontScale: 0.7,
  })`
    color: white;
    font-family: "KochAltschrift";
    font-size: ${baseFont}px;
    font-weight: bold;
  `;

  const StyledAcolyteInfo = styled.Text`
    color: rgba(224, 211, 31, 1);
    font-family: "KochAltschrift";
    font-size: ${baseFont * 0.8}px;
    margin-top: 2px;
  `;

  const StyledAcolyteClass = styled.Text`
    color: rgba(4, 124, 20, 1);
    font-family: "KochAltschrift";
    font-size: ${baseFont * 0.8}px;
    margin-top: 2px;
  `;

  const acolytePhoto = { uri: acolyte.avatar };

  return (
    <ComponentContainer>
      <AcolyteImage source={acolytePhoto} />
      <StyledAcolyteName>{acolyte.nickname}</StyledAcolyteName>

      <StyledAcolyteInfo>
        Gold: <Text style={{ color: "white" }}>{acolyte.gold}</Text> coins
      </StyledAcolyteInfo>

      <StyledAcolyteInfo>
        Level: <Text style={{ color: "white" }}>{acolyte.level}</Text>
      </StyledAcolyteInfo>

      <StyledAcolyteClass>
        Class: {acolyte.profile.name}
      </StyledAcolyteClass>
    </ComponentContainer>
  );
};

export default AcolyteTowerRegister;
