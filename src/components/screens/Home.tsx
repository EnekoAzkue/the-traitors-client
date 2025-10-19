import { View, Text } from "react-native";
import ScreenContainer from "./ScreenContainer";
import { Images, Roles } from "../../helpers/constants/constants";
import React, { use, useContext } from "react";
import { UserContext } from "../../helpers/contexts/contexts";

function Home() {

  const userContext = useContext(UserContext);

  if(!userContext) throw new Error("User context is null at Home Component!!!");

  const [user, setUser] = userContext;


  return (
    <ScreenContainer backgroundImg={Images.ACOLYTE_HOME}>
      <Text style={{color:"white"}}>{user.rol}</Text>
    </ScreenContainer>
  );
}


export default Home;