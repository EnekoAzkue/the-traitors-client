import React from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteStatus from "./roles/acolyte/AcolyteStatus";
import IstvanStatus from "./roles/istvan/IstvanStatus";
import MortimerStatus from "./roles/mortimer/MortimerStatus";
import VillainStatus from "./roles/villain/VillainStatus";

export default function Status() {
    const user = useUserStore(state => state.user);

    if (!user) return;


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