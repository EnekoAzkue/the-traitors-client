import React from "react";
import { Roles } from "../../helpers/constants/constants";
import { useUserStore } from "../../helpers/stores/useUserStore";
import ScreenTower from "./ScreenTower";
import MortimerTower from "./roles/mortimer/MortimerTower";

export default function Lab() {
    const user = useUserStore(state => state.user);

    if (!user) return;


    switch (user.rol) {
        case Roles.ACOLYTE:
            return <ScreenTower />

        case Roles.MORTIMER:
            return <MortimerTower />

        case Roles.VILLAIN:
            return <ScreenTower />

        case Roles.ISTVAN:
            return <ScreenTower />
        default:
            break;
    }
}