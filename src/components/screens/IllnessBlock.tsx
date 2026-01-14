import React from "react";
import { useWindowDimensions, View } from "react-native";
import { Images } from "../../helpers/constants/constants";
import ScreenContainer from "./ScreenContainer";
import styled from "styled-components/native";

function IllnessBlock() {

  const {width, height} = useWindowDimensions()

  const Text = styled.Text`
    color: white;
    font-family: KochAltschrift;
    font-size: ${Math.min(width * 0.5, 60)}px;
    top: ${height * 0.25}
  `
  return (
      <ScreenContainer backgroundImg={Images.ILLNESS_BLOCK}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>You're ill</Text>
        </View>
      </ScreenContainer>
  );
}

export default IllnessBlock;