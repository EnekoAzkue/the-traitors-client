import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import Button from "../../../Button";
import styled from "styled-components/native";
import AcolyteLabRegister from "./AcolyteLabRegister";
import getAllAcolytes from "../../../../helpers/serverRequests/getAllAcolytes";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";

function MortimerLab() {
  const [watchingLab, setWatchingLab] = useState<boolean>(false);
  const [acolytes, setAcolytes] = useState<KaotikaPlayer[] | void>([]);

  const watchingLabHandler = () => {
    setWatchingLab(!watchingLab);
  };

  const acolytesHandler = (acolytesArray: [] | void) => {
    setAcolytes(acolytesArray);
  };

  const ButtonStyledText = styled.Text`
    color: white;
    font-size: 25px;
    position: relative;
    top: 38%;
    fontFamily: 'KochAltschrift';
  `;

  const AcolytesRegisterScreenContainer = styled.View`
    alignItems: center; 
    flex: 1; 
    width: 100%;
  `;
  // El flex: 1 hará que ocupe todo el espacio disponible y en  AcolytesRegisterListContainer tambien le permitirá al scrollView expandirse

  const AcolytesRegisterListContainer = styled.ScrollView`
    flex: 1;
    width: 90%;

    border: 1px solid rgba(148, 54, 0, 1);
    border-radius: 8px;

    background-color: rgba(0,0,0,0.3);
  `;




  const showAcolytesList = async () => {
    watchingLabHandler();
    const response = await getAllAcolytes();
    let acolytes = null;

    if (response.status === 200) {
      acolytes = await response.json();
      acolytesHandler(acolytes);
    } else {
      throw new Error("Error happened while client was trying to get all acolytes from server.");
    }
  }



  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_LAB}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          (watchingLab) ?
            <>
              <AcolytesRegisterScreenContainer>
                <AcolytesRegisterListContainer contentContainerStyle={{alignItems: "center", justifyContent: "center" }}>
                  {
                    // --- MOSTRAR LA LISTA CON LOS ACÓLITOS --- 
                    (acolytes) ?
                      acolytes.map((acolyte, index) => {
                        console.log(acolyte.avatar);
                        return (
                          <AcolyteLabRegister key={index} acolyte={acolyte} />
                        );
                      })

                      :

                      <>
                        <Text>NO USERS?</Text>
                      </>

                  }
                </AcolytesRegisterListContainer>


                <TouchableOpacity onPress={watchingLabHandler}>
                  <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: 200, height: 150, alignItems: "center" }} >
                    <ButtonStyledText>{"Stop Watching."}</ButtonStyledText>
                  </ImageBackground>
                </TouchableOpacity>
              </AcolytesRegisterScreenContainer>
            </>

            :

            <>
              <TouchableOpacity onPress={showAcolytesList} style={{ position: "relative", top: 250 }}>
                <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: 200, height: 150, alignItems: "center" }} >

                  <ButtonStyledText>{"Watch acolytes."}</ButtonStyledText>
                </ImageBackground>
              </TouchableOpacity>
            </>

        }
      </View>
    </ScreenContainer>
  );
}



export default MortimerLab;