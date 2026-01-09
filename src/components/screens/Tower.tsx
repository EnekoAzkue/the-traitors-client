import React from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import MortimerTower from "./roles/mortimer/MortimerTower";
import AcolyteTower from "./roles/acolyte/AcolyteTower";
import IstvanTower from "./roles/istvan/IstvanTower";
import VillainTower from "./roles/villain/VillainTower";


function Tower() {

  // --- CONTEXTS && STORES --- //
  const user = useUserStore(state => state.user);

  // --- STATES --- //
  if (!user) return null;

  // --- EFFECTS --- //

  // --- FUNCTIONS --- // 
  const towers = () => {
    switch (user.rol) {
      case Roles.ACOLYTE:
        return (<AcolyteTower />);

      case Roles.MORTIMER:
        return (<MortimerTower />);

      case Roles.ISTVAN:
        return (<IstvanTower />);


      case Roles.VILLAIN:
        return (<VillainTower />);

      default:
        break;
    }
  }
  return (
    <>
      {towers()}
    </>
  );
}

export default Tower;
