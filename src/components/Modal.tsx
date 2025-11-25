import { Modal } from 'react-native';
import { ModalProps } from '../helpers/interfaces/components/Modal';
import styled from 'styled-components/native';
import React from 'react';
import { Images } from '../helpers/constants/constants';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.ImageBackground`
    width: ${width * 0.9}px;
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
  text-shadow: 0 0 2.5px rgb(0 0 0 / 1);
  fontFamily: 'KochAltschrift';

  font-size: ${Math.min(width * 0.07, 30)}px;
`;

const DismissButton = styled.Pressable`
  border-radius: 10px;
  padding: ${width * 0.05}px ${width * 0.1}px;
  filter: drop-shadow(0 0 5px rgb(0 0 0));
  background-color: rgb(0 0 0 / 0.65);
  position: absolute;
  margin-top: ${height * 0.4}px;
`;

const DismissButtonText = styled(Message)`
  padding: 0;
  color: rgb(177 164 144);
  fontFamily: 'KochAltschrift';
  font-size: ${Math.min(width * 0.06, 28)}px;

`;

const GeneralModal = ({ message, setMessage }: ModalProps) => {
    function handlePress(): void {
        setMessage('');
    }

    return (
        <Modal
            animationType="fade"
            backdropColor="rgba(0 0 0 / 0.5)"
            visible={!!message}
        >
            <Container>
                <BackgroundImage
                    source={Images.MODAL}
                    imageStyle={{ resizeMode: 'contain' }}
                >
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
