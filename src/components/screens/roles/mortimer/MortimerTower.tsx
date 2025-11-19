import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import styled from "styled-components/native";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";
import { AllAcolytesContext, MortimerToastTextContext } from "../../../../helpers/contexts/contexts";
import AcolyteTowerRegister from "./AcolyteTowerRegister";
import Toast from "../../../Toast";

function MortimerTower() {

  const allAcolytesContext = useContext(AllAcolytesContext);
  const mortimerToastTextContext = useContext(MortimerToastTextContext);

  if (!allAcolytesContext) return <Text>User context is null at Home Component!!!"</Text>;
  if (!mortimerToastTextContext) return; 

  const [acolytes, setAcolytes] = allAcolytesContext;
  const [mortimerToastText, setMortimerToastText] = mortimerToastTextContext;

  const acolytesHandler = (acolytesArray: KaotikaPlayer[] | undefined) => {
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

    border: 1px solid rgba(85, 0, 134, 1);
    border-radius: 8px;

    background-color: rgba(0,0,0,0.3);
  `;


  const TitleContainer = styled.View`
    border: 2px solid rgba(85, 0, 134, 1);
    border-radius: 8px;
    margin: 3px;
    width: 90%;
    background: rgba(0,0,0,1 );
  `;

  const RegisterTitle = styled.Text`
    text-align: center;
    color: white;
    font-size: 25px;
    fontFamily: 'KochAltschrift';
    margin : 5px;
  `;

  useEffect(() => {
    if(mortimerToastText){
      setTimeout( () => {setMortimerToastText("")}, 3000);
    }
  }, [mortimerToastText]);


  return (

    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <ScreenContainer backgroundImg={Images.MORTIMER_TOWER}>
        { (mortimerToastText) ? <Toast toastText={mortimerToastText}/> : <></>}
        <View style={{ marginTop: 20, height: 680, alignItems: 'center', justifyContent: 'center' }}>
          {
            <>
              <TitleContainer>
                <RegisterTitle>Who's inside the Tower</RegisterTitle>
              </TitleContainer>
              <AcolytesRegisterScreenContainer>
                <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                  {
                    // --- MOSTRAR LA LISTA CON LOS ACÓLITOS --- 
                    (acolytes) ?
                      acolytes.map((acolyte, index) => {
                        return (<AcolyteTowerRegister key={index} acolyte={acolyte} />
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

    </View>


  );
}



export default MortimerTower;