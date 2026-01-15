import React, { useEffect } from "react";
import { Roles, Screens } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteStatus from "./roles/acolyte/AcolyteStatus";
import IstvanStatus from "./roles/istvan/IstvanStatus";
import MortimerStatus from "./roles/mortimer/MortimerStatus";
import VillainStatus from "./roles/villain/VillainStatus";
import { useAcolytesCurrentNavigationTabStore } from "../../helpers/stores/useAcolytesCurrentNavigationTabStore";

export default function Status() {
    const user = useUserStore(state => state.user);
    const setInitialRouteScreen = useAcolytesCurrentNavigationTabStore(state => state.setAcolyteCurrentTabNavigation);
    

    if (!user) return;

    useEffect(() => {
      setInitialRouteScreen(Screens.STATUS)
    }, [])


    switch (user.rol) {
        case Roles.ACOLYTE:
            return <AcolyteStatus />

        case Roles.MORTIMER:
            return <MortimerStatus />

        case Roles.VILLAIN:
            return <VillainStatus />

        case Roles.ISTVAN:
            return <IstvanStatus />
        default:
            break;
    }
}