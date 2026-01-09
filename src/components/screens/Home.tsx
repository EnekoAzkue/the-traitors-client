import React, { use, useEffect } from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteHome from "./roles/acolyte/AcolyteHome";
import MortimerHome from "./roles/mortimer/MortimerHome";
import IstvanHome from "./roles/istvan/IstvanHome";
import VillainHome from "./roles/villain/VillainHome";
import { Text } from "react-native";


function Home() {

  // --- CONTEXTS && STORES --- //
  const user = useUserStore(state => state.user);

  // --- STATES --- //
  if (!user) return null;

  // --- EFFECTS --- //
  useEffect(() => {
    console.log("Home render");
  }, []);
  
  // --- FUNCTIONS --- // 
  const homes = () => {
    switch (user.rol) {
      case Roles.ACOLYTE:
        return (<AcolyteHome />);

      case Roles.MORTIMER:
        return (<MortimerHome />);

      case Roles.ISTVAN:
        return (<IstvanHome />);


      case Roles.VILLAIN:
        return (<VillainHome />);

      default:
        break;
    }
  }
  return (
    <>
      <Text>Acolyte Home Screen</Text>

      {homes()}
    </>
  );
}

export default Home;
