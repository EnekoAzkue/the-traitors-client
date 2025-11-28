import React from "react";
import { Images } from "../../helpers/constants/constants";
import { useScreenDimensions } from "../../helpers/stores/useScreenDimensionsStore";
import { getStyledSplashScreenComponents } from "../../componentStyles/screensStyles/SplashStyles";


function Splash() {
    // Screen Dimensions
    const screenDimensions = useScreenDimensions(state => state.screenDimensions);
    if (!screenDimensions) return;

    // --- SPLASH SCREEN STYLED COMPONENTS --- //
    const StyledComponents = getStyledSplashScreenComponents(screenDimensions);

    return (
        <StyledComponents.SplashScreen>
            <StyledComponents.SplashStyledBackground source={Images.SPLASH_SCREEN} resizeMode="cover"/>
        </StyledComponents.SplashScreen>

    );
}
export default Splash;