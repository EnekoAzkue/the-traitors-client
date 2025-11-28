import React, { useState } from "react";
import { Text } from "react-native";
import { AcolyteTowerRegisterProps } from "./../../../../helpers/interfaces/components/AcolyteTowerRegisterProps";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { getMortimersAcolyteTowerRegisterStyledComponents } from "../../../../componentStyles/screensStyles/roles/mortimer/AcolyteTowerRegisterStyles";

const AcolyteTowerRegister = ({ acolyte }: AcolyteTowerRegisterProps) => {
  const [insideTower, setInsideTower] = useState(acolyte.insideTower);

  const screenDimensions = useScreenDimensions( state => state.screenDimensions);
  if (!screenDimensions) return;

  const {ComponentContainer, AcolyteImage, StyledAcolyteName, StyledAcolyteInfo, StyledAcolyteClass} = getMortimersAcolyteTowerRegisterStyledComponents( screenDimensions, insideTower );

  const acolytePhoto = { uri: acolyte.avatar };

  return (
    <ComponentContainer>
      <AcolyteImage source={acolytePhoto} />
      <StyledAcolyteName>
        {acolyte.nickname}
      </StyledAcolyteName>

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
