import React from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import AcolyteSettings from "./roles/acolyte/AcolyteSettings";
import MortimerSettings from "./roles/mortimer/MortimerSettings";
import VillainSettings from "./roles/villain/VillainSettings";
import IstvanSettings from "./roles/istvan/IstvanSettings";

export default function Home() {
    const user = useUserStore(state => state.user);

    if (!user) return;


    switch (user.rol) {
        case Roles.ACOLYTE:
            return <AcolyteSettings />

        case Roles.MORTIMER:
            return <MortimerSettings />

        case Roles.VILLAIN:
            return <VillainSettings />

        case Roles.ISTVAN:
            return <IstvanSettings />
        default:
            break;
    }
}