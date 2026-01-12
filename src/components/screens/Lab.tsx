import React from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteLab from "./roles/acolyte/AcolyteLab";
import MortimerLab from "./roles/mortimer/MortimerLab";
import VillainLab from "./roles/villain/VillainLab";
import IstvanLab from "./roles/istvan/IstvanLab";

export default function Lab() {
    const user = useUserStore(state => state.user);

    if (!user) return;


    switch (user.rol) {
        case Roles.ACOLYTE:
            return <AcolyteLab />

        case Roles.MORTIMER:
            return <MortimerLab />

        case Roles.VILLAIN:
            return <VillainLab />

        case Roles.ISTVAN:
            return <IstvanLab />
        default:
            break;
    }
}