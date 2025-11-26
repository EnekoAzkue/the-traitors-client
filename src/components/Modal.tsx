import React from 'react';
import { Modal } from 'react-native';
import { ModalProps } from '../helpers/interfaces/components/Modal';
import { Images } from '../helpers/constants/constants';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';
import { getModalStyledComponents } from '../componentStyles/GeneralModalStyles';

const GeneralModal = ({ message, setMessage }: ModalProps) => {
  // Screen Dimensions
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  function handlePress(): void {
    setMessage('');
  }
  
  // --- GENERAL MODAL STYLED COMPONENTS --- //
  const StyledComponents = getModalStyledComponents(screenDimensions);

  return (
    <Modal animationType="fade" backdropColor="rgba(0 0 0 / 0.5)" visible={!!message} >
      <StyledComponents.Container>
        <StyledComponents.BackgroundImage source={Images.MODAL} imageStyle={{ resizeMode: 'contain' }}>
          <StyledComponents.Content>
            <StyledComponents.Message>{message}</StyledComponents.Message>
            <StyledComponents.DismissButton onPress={handlePress}>
              <StyledComponents.DismissButtonText>Dismiss</StyledComponents.DismissButtonText>
            </StyledComponents.DismissButton>
          </StyledComponents.Content>
        </StyledComponents.BackgroundImage>
      </StyledComponents.Container>
    </Modal>
  );
};

export default GeneralModal;
