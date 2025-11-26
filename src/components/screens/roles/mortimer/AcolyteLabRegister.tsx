import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { AcolyteLabRegisterProps } from "../../../../helpers/interfaces/components/AcolyteLabRegisterProps";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";

const AcolyteLabRegister = ({ acolyte }: AcolyteLabRegisterProps) => {
  const [isInside, setIsInside] = useState(acolyte.isInside);

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;
  const { width, height } = screenDimensions;

  // Ajusta proporciones para que no sea demasiado pequeño
  const componentWidth = width * 0.9; // ocupa 90% del largo de la pantalla
  const componentHeight = height * 0.22;
  const imageSize = componentHeight * 0.6; // el ancho y el largo del componente de la imagen
  const baseFont = componentHeight * 0.12; // fuente proporcional al componente

  const ComponentContainer = styled.View`
    border: 1px solid rgba(134, 65, 0, 1);
    border-radius: 8px;
    background: rgba(0,0,0,0.6);
    margin-vertical: 8px;
    width: ${componentWidth}px;
    height: ${componentHeight}px;
    filter: grayscale(${ (isInside) ? 100 : 0 }%);
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

export default AcolyteLabRegister;
