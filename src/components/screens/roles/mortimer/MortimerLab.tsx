import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import Button from "../../../Button";
import styled from "styled-components/native";

function MortimerLab() {
  const [watchingLab, setWatchingLab] = useState(false);
  const [acolytes, setAcolytes] = useState([]);

  const whatchingLabHandler = () => {
    setWatchingLab(!whatchingLabHandler);
  };

  const ButtonStyledText = styled.Text`
    color: white;
    font-size: 25px;
    position: relative;
    top: 38%;
    fontFamily: 'KochAltschrift';
  `;


  useEffect((() => {
    // Obtener la lista de todos los acolitos almacenados en la BD y guardar el array en la lista  
  }), []);

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_LAB}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position:'relative', top: 300 }}>

        <TouchableOpacity onPress={() => {}}>
          <ImageBackground source={Images.BUTTON} resizeMode="cover" style={{ width: 200, height: 150, alignItems: "center"}} >

            <ButtonStyledText>{"Watch acolytes."}</ButtonStyledText>
          </ImageBackground>
        </TouchableOpacity>
        {
          (watchingLab) ?
            <>
              {
                // --- MOSTRAR LA LISTA CON LOS ACÓLITOS ---      
                acolytes.map((acolyte) => {
                  return (
                    <>
                    </>
                  );
                })
              }

            </>

            :
            <Button buttonText="Watch who is inside the lab" onPress={whatchingLabHandler}></Button>
        }
      </View>
    </ScreenContainer>
  );
}


export default MortimerLab;