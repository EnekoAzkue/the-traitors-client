import React from 'react';
import { Modal } from 'react-native';
import { Images } from '../helpers/constants/constants';
import { ModalProps } from '../helpers/interfaces/components/Modal';
import { getModalStyledComponents} from '../componentStyles/GeneralModalStyles';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';

const GeneralModal = ({ message, setMessage }: ModalProps) => {
  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  function handlePress(): void {
    setMessage('');
  }
  
  // --- GENERAL MODAL STYLED COMPONENTS --- //
  const {Container, BackgroundImage, Content, Message, DismissButton, DismissButtonText} = getModalStyledComponents(screenDimensions);

  return (
    <Modal animationType="fade" backdropColor="rgba(0 0 0 / 0.5)" visible={!!message} >
      <Container>
        <BackgroundImage source={Images.MODAL} imageStyle={{ resizeMode: 'contain' }}>
          <Content>
            <Message>{message}</Message>
            <DismissButton onPress={handlePress}>
              <DismissButtonText>Dismiss</DismissButtonText>
            </DismissButton>
          </Content>
        </BackgroundImage>
      </Container>
    </Modal>
  );
};

export default GeneralModal;
