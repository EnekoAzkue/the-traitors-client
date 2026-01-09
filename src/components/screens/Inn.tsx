import React from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteHome from "./roles/acolyte/AcolyteHome";
import MortimerHome from "./roles/mortimer/MortimerHome";
import IstvanHome from "./roles/istvan/IstvanHome";
import VillainHome from "./roles/villain/VillainHome";
import AcolyteLab from "./roles/acolyte/AcolyteLab";
import MortimerLab from "./roles/mortimer/MortimerLab";
import IstvanLab from "./roles/istvan/IstvanLab";
import VillainLab from "./roles/villain/VillainLab";
import AcolyteInn from "./roles/acolyte/AcolyteInn";
import IstvanInn from "./roles/istvan/IstvanInn";
import MortimerInn from "./roles/mortimer/MortimerInn";
import VillainInn from "./roles/villain/VillainInn";


function Lab() {

  // --- CONTEXTS && STORES --- //
  const user = useUserStore(state => state.user);

  // --- STATES --- //
  if (!user) return null;

  // --- EFFECTS --- //

  // --- FUNCTIONS --- // 
  const labs = () => {
    switch (user.rol) {
      case Roles.ACOLYTE:
        return (<AcolyteInn />);

      case Roles.MORTIMER:
        return (<MortimerInn />);

      case Roles.ISTVAN:
        return (<IstvanInn />);

      case Roles.VILLAIN:
        return (<VillainInn />);

      default:
        break;
    }
  }
  return (
    <>
      {labs()}
    </>
  );
}

export default Lab;
