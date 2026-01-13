import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { socket } from '../helpers/socket/socket';
import { Modal, Text, useWindowDimensions, View } from 'react-native';
import { ModalProps } from '../helpers/interfaces/components/Modal';
import { Images, INN_STATES, Roles, SocketClientToServerEvents } from '../helpers/constants/constants';
import { useUserStore } from '../helpers/stores/useUserStore';
import { useInnStore } from '../helpers/stores/useInnStateStore';
import { InnerScreen } from 'react-native-screens';
import { AcolyteStatusProps } from '../helpers/interfaces/components/AcolyteStatusProps';

export default function StatusModal({ acolyte, setShowModal }: AcolyteStatusProps) {

  // --- CONSTANTS && ZUSTAND STORES --- //
  const { width, height } = useWindowDimensions();
  const user = useUserStore(state => state.user);

  if (!user) return null;

  // --- STYLED COMPONENTS --- //
  const Container = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
  `;

  const BackgroundImage = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
  `;

  const Content = styled.View`
    height: 80%;
    justify-content: center;
    align-items: center;
    row-gap: ${height * 0.02}px;
    padding-block-start: ${height * 0.1}px;
  `;

  const Message = styled.Text`
    padding-inline: ${width * 0.2}px;
    text-align: center;
    text-shadow: 0 0 2.5px rgba(0, 0, 0, 1);
    font-family: 'KochAltschrift';
    color: white;
    font-size: ${Math.min(width * 0.055, 30)}px;
  `;

  const ButtonsContainer = styled.View`
    flex-direction: row;
    gap: ${width * 0.05}px;
    justify-content: center;
    align-items: center;
  `;

  const AcceptButton = styled.Pressable`
    border-radius: 10px;
    padding: ${width * 0.025}px ${width * 0.05}px;
    filter: drop-shadow(0 0 5px rgb(0 0 0));
    background-color: rgba(0, 0, 0, 0.65);
    position: relative;
    border: 1px solid rgba(173, 64, 13, 1);
  `;

  const AcceptButtonText = styled(Message)`
    padding: 0;
    color: rgb(177, 164, 144);
    fontFamily: 'KochAltschrift';
    font-size: ${Math.min(width * 0.06, 28)}px;
  `;

  const CloseButton = styled(Message)`
    border-radius: 10px;
    padding: ${width * 0.025}px ${width * 0.05}px;
    filter: drop-shadow(0 0 5px rgb(0 0 0));
    background-color: rgba(0, 0, 0, 0.65);
    position: relative;
    border: 1px solid rgba(255, 255, 255, 1);
    width: ${width * 0.2};
    align-items: center;
  `

  const modalToggle = () => {
    setShowModal(false)
  }

  const curseAcolyte = () => {

  }

  useEffect(() => {
    console.log(acolyte)
  }, [])

  return (
    <Modal
      animationType="fade"
      backdropColor="rgba(0,0,0 / 0.5)"
    >
      <Container>
        <BackgroundImage
          source={Images.STATUS_MODAL}
          imageStyle={{ resizeMode: 'contain' }}
        >
          <Content>
            {user.rol === Roles.ISTVAN &&
            <>
              {!acolyte?.isCursed ? 
              <Text>{acolyte?.nickname} is already cursed</Text>
              : 
              <AcceptButton onPress={curseAcolyte}>
                <AcceptButtonText>SET CURSE</AcceptButtonText>
              </AcceptButton>
              }
            </>
            }
          </Content>
          <View style={{ alignItems: 'center' }}>
            <CloseButton onPress={modalToggle}>X</CloseButton>
          </View>
        </BackgroundImage>
      </Container>
    </Modal>
  );
};