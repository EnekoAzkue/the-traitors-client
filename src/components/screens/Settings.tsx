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
import AcolyteSettings from "./roles/acolyte/AcolyteSettings";
import IstvanSettings from "./roles/istvan/IstvanSettings";
import MortimerSettings from "./roles/mortimer/MortimerSettings";
import VillainSettings from "./roles/villain/VillainSettings";


function Settings() {

  // --- CONTEXTS && STORES --- //
  const user = useUserStore(state => state.user);

  // --- STATES --- //
  if (!user) return null;

  // --- EFFECTS --- //

  // --- FUNCTIONS --- // 
  const settings = () => {
    switch (user.rol) {
      case Roles.ACOLYTE:
        return (<AcolyteSettings />);

      case Roles.MORTIMER:
        return (<MortimerSettings />);

      case Roles.ISTVAN:
        return (<IstvanSettings />);


      case Roles.VILLAIN:
        return (<VillainSettings />);

      default:
        break;
    }
  }
  return (
    <>
      {settings()}
    </>
  );
}

export default Settings;
