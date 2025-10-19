import { View, Text } from "react-native";
import ScreenContainer from "./ScreenContainer";
import { Images, Roles } from "../../helpers/constants/constants";
import React, { use, useContext } from "react";
import { UserContext } from "../../helpers/contexts/contexts";
import MortimerHome from "./role/mortimer/MortimerHome";
import VillainHome from "./role/villain/VillainHome";
import IstvanHome from "./role/istvan/IstvanHome";
import AcolyteHome from "./role/acolyte/AcolyteHome";

function Home() {

  const userContext = useContext(UserContext);

  if (!userContext) return <Text>User context is null at Home Component!!!"</Text>;

  const [user, setUser] = userContext;


  switch (user.rol) {
    case (Roles.MORTIMER):
      return (<MortimerHome />);

    case (Roles.VILLAIN):
      return (<VillainHome />);

    case (Roles.ISTVAN):
      return (<IstvanHome/>);

    case (Roles.ACOLYTE):
      return (<AcolyteHome/>);

    default: 
      return (<Text>Error! Rol Not found</Text>)
  }
}


export default Home;