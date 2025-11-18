import React from "react";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import Logout from "../../Logout";


function MortimerSettings() {

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );

}


export default MortimerSettings;