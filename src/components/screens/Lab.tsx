import { View, Text } from "react-native";
import ScreenContainer from "./ScreenContainer";
import { Images, Roles } from "../../helpers/constants/constants";
import React, { useContext } from "react";
import { UserContext } from "../../helpers/contexts/contexts";
import MortimerLab from "./roles/mortimer/MortimerLab";
import VillainLab from "./roles/villain/VillainLab";
import IstvanLab from "./roles/istvan/IstvanLab";
import AcolyteLab from "./roles/acolyte/AcolyteLab";

function Lab() {
  const userContext = useContext(UserContext);

  if (!userContext) return <Text>User context is null at Home Component!!!"</Text>;

  const [user, setUser] = userContext;

  console.log(user);

  switch (user.rol) {
    case (Roles.MORTIMER):
      return (<MortimerLab />);

    case (Roles.VILLAIN):
      return (<VillainLab />);

    case (Roles.ISTVAN):
      return (<IstvanLab />);

    case (Roles.ACOLYTE):
      return (<AcolyteLab />);

    default:
      return (<Text>{`Error! Rol: ${user.rol} Not found`}</Text>);
  }

}


export default Lab;