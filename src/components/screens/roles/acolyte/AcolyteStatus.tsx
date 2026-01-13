import React from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import styled from "styled-components/native";

function AcolyteStatus() {

  const { width, height } = useWindowDimensions()
  const user = useUserStore(state => state.user);

  if (!user) return null;

  const Avatar = styled.Image`
    width: ${width * 0.35}px;
    height: ${width * 0.35}px;
    resizeMode: "cover";
    marginTop: ${height * 0.05}px;
    border: 5px solid white;
  `
  const NameContainer = styled.View`
    background: rgba(0,0,0,0.9);
    padding: ${height * 0.01}px ${width * 0.05}px;
    marginTop: ${height * 0.03}px;
    borderRadius: 9px;
    border: 3px solid white;
  `
  const Nickname = styled.Text`
    fontFamily: 'KochAltschrift';
    color: white;
    font-size: ${width * 0.1}px;
    alignItems: center;
  `
  const StatusContainer = styled.View`
    background: rgba(0,0,0,0.9);
    padding: ${height * 0.01}px ${width * 0.05}px;
    marginTop: ${height * 0.03}px;
    borderRadius: 9px;
    width: ${width * 0.9};
    alignItems: center;
    border: 3px solid white;

  `
  const StatusText = styled.Text`
    fontFamily: 'KochAltschrift';
    color: white;
    font-size: ${width * 0.07}px;
    alignItems: center;
  `

  return (
    <ScreenContainer backgroundImg={Images.STATUS} >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Avatar source={{ uri: user.avatar }} borderRadius={999} />
        <NameContainer>
          <Nickname>{user.nickname}</Nickname>
        </NameContainer>
        <StatusContainer>
          <StatusText>Resistance: {user.resistance}%</StatusText> 
        </StatusContainer>
      </View>
    </ScreenContainer>
  );

}

export default AcolyteStatus;