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

  if (!acolyte) return null;
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
    height: 50%;
    justify-content: center;
    align-items: center;
    top: ${height * 0.25}px;
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
    gap: ${width * 0.01}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${height * 0.38}px;
  `;

  const AcceptButton = styled.Pressable`
    border-radius: 10px;
    padding: ${width * 0.025}px ${width * 0.05}px;
    filter: drop-shadow(0 0 5px rgb(0 0 0));
    background-color: rgba(0, 0, 0, 0.65);
    position: relative;
    border: 1px solid white;
  `;

  const AcceptButtonText = styled(Message)`
    padding: 0;
    fontFamily: 'KochAltschrift';
    font-size: ${Math.min(width * 0.06, 28)}px;
  `;

  const CloseButton = styled(Message)`
    border-radius: 10px;
    padding: ${width * 0.025}px ${width * 0.05}px;
    filter: drop-shadow(0 0 5px rgb(0 0 0));
    background-color: rgba(0, 0, 0, 0.65);
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 1);
    width: ${width * 0.2};
    align-items: center;
    top: ${height * 0.25}px;
  `

  const ModalText = styled(Message)`
  font-size: ${Math.min(width * 0.2, 30)}px;
  color: black;
  `

  const MortimerContainer = styled.View`
  flex-direction: row;
  width: ${width * 0.8}px;
  justify-content: space-between;
  margin-top: ${height * 0.03}px;
`;

const IllnessContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${width * 0.01}px;
`;


const CompactText = styled.Text`
  text-align: center;
  font-family: 'KochAltschrift';
  color: black;
`;


const IllnessText = styled(CompactText)`
  font-size: ${Math.min(width * 0.09, 30)}px;
`;

const StatusText = styled(CompactText)`
  margin-top: ${height * 0.01}px;
  font-size: ${Math.min(width * 0.055, 26)}px;
  font-weight: bold;
`;



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
                {acolyte?.isCursed ?
                  <View style={{ justifyContent: 'center' }}>
                    <ModalText>{acolyte?.nickname}</ModalText>
                    <ModalText> is already cursed</ModalText>
                  </View>
                  :
                  <>
                    <AcceptButton onPress={curseAcolyte}>
                      <AcceptButtonText>SET CURSE TO</AcceptButtonText>
                    </AcceptButton>
                    <ModalText>{acolyte?.nickname}</ModalText>
                  </>
                }
              </>
            }
            {user.rol === Roles.VILLAIN &&
              <>
                <ModalText>{acolyte?.nickname}</ModalText>
                <ModalText>List of illnesses:</ModalText>
                <IllnessContainer>
                  {acolyte?.disease.map((illness, index) => {
                    return <IllnessText key={index}>{illness}</IllnessText>
                  })}
                </IllnessContainer>
                <ButtonsContainer>
                  <AcceptButton onPress={modalToggle}>
                    <AcceptButtonText>Set PP</AcceptButtonText>
                  </AcceptButton>
                  <AcceptButton onPress={modalToggle}>
                    <AcceptButtonText>Set EW</AcceptButtonText>
                  </AcceptButton>
                  <AcceptButton onPress={modalToggle}>
                    <AcceptButtonText>Set MA</AcceptButtonText>
                  </AcceptButton>
                </ButtonsContainer>
              </>
            }
            {user.rol === Roles.MORTIMER &&
              <>
                <ModalText>{acolyte?.nickname}</ModalText>
                <MortimerContainer>

                  <IllnessContainer>
                    <IllnessText>Is ill?</IllnessText>
                    <StatusText>{acolyte.disease ? 'YES' : 'NO'}</StatusText>
                  </IllnessContainer>

                  <IllnessContainer>
                    <IllnessText>Is cursed?</IllnessText>
                    <StatusText>{acolyte.isCursed ? 'YES' : 'NO'}</StatusText>
                  </IllnessContainer>

                  <IllnessContainer>
                    <IllnessText>Is tired?</IllnessText>
                    <StatusText>{acolyte.resistance < 30 ? 'YES' : 'NO'}</StatusText>
                  </IllnessContainer>

                </MortimerContainer>

                <ButtonsContainer>
                  <AcceptButton onPress={modalToggle}>
                    <AcceptButtonText>Cleanse</AcceptButtonText>
                  </AcceptButton>
                  <AcceptButton onPress={modalToggle}>
                    <AcceptButtonText>Dispell</AcceptButtonText>
                  </AcceptButton>
                  <AcceptButton onPress={modalToggle}>
                    <AcceptButtonText>Rest</AcceptButtonText>
                  </AcceptButton>
                </ButtonsContainer>
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