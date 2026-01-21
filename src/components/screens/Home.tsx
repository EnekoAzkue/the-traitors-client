import React, { useEffect } from "react";
import { Roles, Screens } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteHome from "./roles/acolyte/AcolyteHome";
import MortimerHome from "./roles/mortimer/MortimerHome";
import VillainHome from "./roles/villain/VillainHome";
import IstvanHome from "./roles/istvan/IstvanHome";
import { useAcolytesCurrentNavigationTabStore } from "../../helpers/stores/useAcolytesCurrentNavigationTabStore";

export default function Home() {
    const user = useUserStore(state => state.user);
    const setInitialRouteScreen = useAcolytesCurrentNavigationTabStore(state => state.setAcolyteCurrentTabNavigation);
    
    if (!user) return;

    useEffect(() => {
      setInitialRouteScreen(Screens.MAP)
    }, [])

    switch (user.rol) {
        case Roles.ACOLYTE:
            return <AcolyteHome />

        case Roles.MORTIMER:
            return <MortimerHome />

        case Roles.VILLAIN:
            return <VillainHome />

        case Roles.ISTVAN:
            return <IstvanHome />
        default:
            break;
    }
}