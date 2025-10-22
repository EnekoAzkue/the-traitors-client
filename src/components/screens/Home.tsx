import { View, Text } from "react-native";
import ScreenContainer from "./ScreenContainer";
import { Images, Roles } from "../../helpers/constants/constants";
import React, { use, useContext } from "react";
import { UserContext } from "../../helpers/contexts/contexts";
import MortimerHome from "./roles/mortimer/MortimerHome";
import VillainHome from "./roles/villain/VillainHome";
import IstvanHome from "./roles/istvan/IstvanHome";
import AcolyteHome from "./roles/acolyte/AcolyteHome";

function Home() {

  const userContext = useContext(UserContext);

  if (!userContext) return <Text>User context is null at Home Component!!!"</Text>;

  const [user, setUser] = userContext;

  console.log(user);

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
      return (<Text>{`Error! Rol: ${user.rol} Not found`}</Text>)
  }
}


export default Home;