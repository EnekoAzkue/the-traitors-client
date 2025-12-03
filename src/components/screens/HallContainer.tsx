import React, { PropsWithChildren, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Dimensions } from 'react-native';
import { Images, Roles, SocketClientToServerEvents } from "../../helpers/constants/constants";
import { AcolyteInitialScreenContext, CollectionContext, UserContext } from "../../helpers/contexts/contexts";
import ScreenContainer from "./ScreenContainer";
import IconButton from "./IconButton";
import { socket } from "../../helpers/socket/socket";
import Button from "../Button";

const { width, height } = Dimensions.get('window');

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function HallContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS --- //
  const userContext = useContext(UserContext);
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const collectionContext = useContext(CollectionContext)

  if (!userContext) return null;
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  if (!collectionContext) return

  const [user] = userContext;
  const setInitialScreen = initialRouterScreen[1];
  const [areAllArtifactsCollected, setAreAllArtifactsCollected] = collectionContext

  useEffect
  // --- FUNCTIONS --- //
  const returnToMap = () => {
    setInitialScreen('SchoolMap')
    socket.emit(SocketClientToServerEvents.ENTER_EXIT_HALL, user.email, false)
  }

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {user.rol === Roles.ACOLYTE && (
          <>
            <IconButton
              width={width * 0.3}
              height={height * 0.07}
              hasBrightness={true}
              backgroundImage={Images.BACK_ARROW}
              buttonOnPress={returnToMap}
              xPos={20}
              yPos={20}
              hasBorder={false}
              backgrounOpacity={0}
            />

            {areAllArtifactsCollected && (
              <Button buttonText="Show artifacts" onPress={undefined} />
            )}
          </>
        )}

        {children}
      </ScreenContainer>
    </View>
  );
};