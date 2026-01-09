import React from 'react';
import styled from 'styled-components/native';
import { socket } from '../helpers/socket/socket';
import { Modal, useWindowDimensions } from 'react-native';
import { ModalProps } from '../helpers/interfaces/components/Modal';
import { Images, INN_STATES, SocketClientToServerEvents } from '../helpers/constants/constants';
import { useUserStore } from '../helpers/stores/useUserStore';
import { useInnStore } from '../helpers/stores/useInnStateStore';
import { InnerScreen } from 'react-native-screens';

export default function BetrayerModal() {

  // --- CONSTANTS && ZUSTAND STORES --- //
  const { width, height } = useWindowDimensions();
  const user = useUserStore(state => state.user);
  const setInnState = useInnStore(state => state.setInnState);

  if (!user) return null;

  // --- FUNCTIONS --- //
  function betray(): void {
    if (user){
      user.isBetrayer = true;
      socket.emit(SocketClientToServerEvents.UPDATE_USER, user.email, {"isBetrayer" : "true"} );
      socket.emit(SocketClientToServerEvents.BETRAYAL)  
      setInnState(INN_STATES.INSIDE_INN);
      console.log("BETRAY");
    }
  }
    function stayLoyal(): void {
      setInnState(INN_STATES.INSIDE_INN);

  }

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

  const NotoriousText = styled.Text`
    color: rgba(255, 102, 0, 1),
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

  return (
    <Modal
      animationType="fade"
      backdropColor="rgba(0,0,0 / 0.5)"
    >
      <Container>
        <BackgroundImage
          source={Images.BETRAYER_MODAL}
          imageStyle={{ resizeMode: 'contain' }}
        >
          <Content>
            <Message>To the wanderer who dares to defy their bloodline: 
              Forsake your kin and pledge your loyalty to the Brotherhood of Shadows.
              In return, claim <NotoriousText>50,000 gold</NotoriousText> coins and the <NotoriousText>Rotten Set of the Decreipt Betrayer</NotoriousText>.
              Your destiny awaits.
            </Message>

            <ButtonsContainer>
              <AcceptButton onPress={betray}>
                <AcceptButtonText>Join them</AcceptButtonText>
              </AcceptButton>

              <AcceptButton onPress={stayLoyal}>
                <AcceptButtonText>Stay Loyal</AcceptButtonText>
              </AcceptButton>

            </ButtonsContainer>

          </Content>
        </BackgroundImage>
      </Container>
    </Modal>
  );
};