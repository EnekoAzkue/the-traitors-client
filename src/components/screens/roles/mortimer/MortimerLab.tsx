import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import styled from "styled-components/native";
import AcolyteLabRegister from "./AcolyteLabRegister";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";
import { AllAcolytesContext } from "../../../../helpers/contexts/contexts";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function MortimerLab() {

  const allAcolytesContext = useContext<[KaotikaPlayer[] | undefined, (newAllAcolytesList: KaotikaPlayer[] | undefined) => void] | null>(AllAcolytesContext);

  if (!allAcolytesContext) return <Text>User context is null at Home Component!!!"</Text>;

  const [acolytes, setAcolytes] = allAcolytesContext;

  const acolytesHandler = (acolytesArray: KaotikaPlayer[] | undefined) => {
    setAcolytes(acolytesArray);
  };


  const AcolytesRegisterScreenContainer = styled.View`
    alignItems: center; 
    flex: 1; 
    width: ${width * 0.25}%;
  `;

  const AcolytesRegisterListContainer = styled.ScrollView`
    flex: 1;
    width: ${width * 0.215}%;

    border: 1px solid rgba(223, 107, 40, 1);
    border-radius: 8px;

    background-color: rgba(0,0,0,0.3);
  `;


  const TitleContainer = styled.View`
    border: 1px solid rgba(243, 137, 76, 1);
    border-radius: 8px;
    margin: ${height * 0.003}%;
    width: ${width * 0.22}%;
    background: rgba(0,0,0,1 );
  `;

  const baseFont = width * 0.065; 


  const RegisterTitle = styled.Text`
    text-align: center;
    color: white;
    font-size: ${baseFont}px;
    fontFamily: 'KochAltschrift';
    margin : ${height * 0.001}%;
  `;


  return (

    <ScreenContainer backgroundImg={Images.MORTIMER_LAB}>
      <View style={{ marginTop: 20, height: height * 0.9, alignItems: 'center', justifyContent: 'center' }}>
        {
          <>
            <TitleContainer>
              <RegisterTitle>Who's inside the Lab</RegisterTitle>
            </TitleContainer>
            <AcolytesRegisterScreenContainer>
              <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                {
                  // --- MOSTRAR LA LISTA CON LOS ACÓLITOS --- 
                  (acolytes) ?
                    acolytes.map((acolyte, index) => {
                      return (<AcolyteLabRegister key={index} acolyte={acolyte} />
                      );
                    })

                    :

                    <>
                      <Text>NO USERS?</Text>
                    </>

                }
              </AcolytesRegisterListContainer>
            </AcolytesRegisterScreenContainer>
          </>
        }
      </View>
    </ScreenContainer>
  );
}



export default MortimerLab;