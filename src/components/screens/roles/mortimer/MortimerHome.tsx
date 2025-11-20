import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";

function MortimerHome() {
  const initialScreenContext = useContext(MortimerInitialScreenContext);
  if(!initialScreenContext) return null;
  const [initialScreen, setInitialScreen] = initialScreenContext;
  
  useEffect(() => {
      setInitialScreen("MortimerHome");
  }, []);

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_HOME}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </ScreenContainer>

  );
}




export default MortimerHome;