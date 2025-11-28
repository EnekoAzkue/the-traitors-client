import React, { useState } from "react";
import { Text } from "react-native";
import { AcolyteLabRegisterProps } from "../../../../helpers/interfaces/components/AcolyteLabRegisterProps";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { getMortimersAcolyteLabRegisterStyledComponents } from "../../../../componentStyles/screensStyles/roles/mortimer/AcolyteLabRegisterStyles";

const AcolyteLabRegister = ({ acolyte }: AcolyteLabRegisterProps) => {
  const [isInside, setIsInside] = useState(acolyte.isInside);

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  // --- STYLED COMPONENTS --- // 
  const {ComponentContainer, AcolyteImage, StyledAcolyteName, StyledAcolyteInfo, StyledAcolyteClass} = getMortimersAcolyteLabRegisterStyledComponents(screenDimensions, isInside);

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
