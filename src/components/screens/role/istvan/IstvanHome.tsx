import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";

function IstvanHome() {

  return (
    <ScreenContainer backgroundImg={Images.ACOLYTE_HOME}> {/* -- CAMBIAR LA IMAGEN DEL ACOLITO A LA DE ISTVAN -- */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style ={{ color: "white" }}>Istvan Home</Text>
      </View>
    </ScreenContainer>
  );
}




export default IstvanHome;