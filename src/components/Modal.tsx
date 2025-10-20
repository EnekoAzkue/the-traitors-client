import { Modal } from 'react-native';
import { ModalProps } from '../helpers/interfaces/Modal';
import styled from 'styled-components/native';
import React from 'react';
import { Images } from '../helpers/constants/constants';

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.ImageBackground`
  width: 325px;
  height: 436px;
`;

const Content = styled.View`
  height: 80%;
  justify-content: center;
  align-items: center;
  row-gap: 18.5px;
  padding-block-start: 82.5px;
`;

const Message = styled.Text`
  padding-inline: 90px;
  text-align: center;
  text-shadow: 0 0 2.5px rgb(0 0 0 / 1);
  fontFamily: 'KochAltschrift';

  fontSize: 22px;
`;

const DismissButton = styled.Pressable`
  border-radius: 10px;
  padding: 10px 30px;
  filter: drop-shadow(0 0 5px rgb(0 0 0));
  background-color: rgb(0 0 0 / 0.65);
  position: absolute;
  margin-top: 90%
`;

const DismissButtonText = styled(Message)`
  padding: 0;
  color: rgb(177 164 144);
  fontFamily: 'KochAltschrift';
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
