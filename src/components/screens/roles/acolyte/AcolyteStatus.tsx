import React from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import styled from "styled-components/native";
import IconButton from "../../../IconButton";
import { socket } from "../../../../helpers/socket/socket";
import { Socket } from "socket.io-client";

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

  const rest = () => {
    socket.emit(SocketClientToServerEvents.REST, user)
  }

  return (
    <ScreenContainer backgroundImg={Images.STATUS} >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Avatar source={{ uri: user.avatar }} borderRadius={999} />
        <NameContainer>
          <Nickname>{user.nickname}</Nickname>
        </NameContainer>
        <StatusContainer>
          <Text style={{color: 'white', fontFamily: 'KochAltschrift', fontSize: 35}}>STATS</Text>
          <StatusText>Int: {user.attributes.intelligence}</StatusText>
          <StatusText>Dex: {user.attributes.dexterity}</StatusText>
          <StatusText>Cha: {user.attributes.charisma}</StatusText>
          <StatusText>Con: {user.attributes.constitution}</StatusText>
          <StatusText>Str: {user.attributes.strength}</StatusText>
          <StatusText>Ins: {user.attributes.insanity}</StatusText>
          <StatusText>Resist: {user.resistance}</StatusText>
        </StatusContainer>
        {user.resistance > 30 &&
        <IconButton backgroundImage={Images.REST_ICON} buttonOnPress={rest} height={width * 0.2} width={width * 0.2} xPos={width * 0.4} yPos={height * 0.77} hasBorder={true} iconText="Rest"/>
        }
      </View>
    </ScreenContainer>
  );

}

export default AcolyteStatus;