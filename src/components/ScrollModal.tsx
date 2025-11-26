import { Modal, ScaledSize } from 'react-native';
import { ModalProps } from '../helpers/interfaces/components/Modal';
import styled from 'styled-components/native';
import React from 'react';
import { Images, SocketClientToServerEvents } from '../helpers/constants/constants';
import { socket } from '../helpers/socket/socket';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';
import { getScrollModalStyledComponents } from '../componentStyles/ScrollModalStyles';


// TODO: 
const ScrollModal = ({ message, setMessage }: ModalProps) => {

    // Screen Dimensions
    const screenDimensions = useScreenDimensions(state => state.screenDimensions);
    if (!screenDimensions) return;

    // --- SCROLL MODAL STYLED COMPONENTS --- //
    const { Container, BackgroundImage, Content, Message, AcceptButton, AcceptButtonText} = getScrollModalStyledComponents(screenDimensions);

    function accept(): void {
        setMessage('');
        socket.emit(SocketClientToServerEvents.SCROLL_VANISH, { notification: { title: "Hechizo disuelto", body: "Se os ha convocado en el Hall of Sages, vuelve a la escuela" } });
    };

    return (
        <Modal animationType="fade" backdropColor="rgba(0 0 0 / 0.5)" visible={!!message}>
            {/**   
            * !!message :
            * Devuelve un boolean --> false si es un valor falsy 
            * Es decir: null, undefined, NaN, 0, "", false), true --> cualquier otra cosa (un valor truthy)
            */}
            <Container>
                <BackgroundImage source={Images.MODAL} imageStyle={{ resizeMode: 'contain' }} >
                    <Content>
                        <Message>{message}</Message>
                        <AcceptButton onPress={accept}>
                            <AcceptButtonText>Break the spell</AcceptButtonText>
                        </AcceptButton>
                    </Content>
                </BackgroundImage>
            </Container>
        </Modal>
    );
};

export default ScrollModal;
