import { Images } from "../../../../constants/constants";
import { GetAcolyteLabAccessParams } from "../../../../interfaces/components/screens/roles/acolyte/AcolyteLabInterfaces";


export function manageAcolyteLabAccess({ user, setBackgroundImg, setAccesedIn }: GetAcolyteLabAccessParams) {
  if (user.isInside) {
    console.log(`is user inside lab? ${user.isInside}`)
    // setBackgroundImg(Images.ACOLYTE_LAB_OPEN);
    // setTimeout(() => {
    //   setBackgroundImg(Images.ACOLYTE_LAB_INSIDE);
    // }, 1200);
    setBackgroundImg(Images.ACOLYTE_LAB_INSIDE)
    setAccesedIn(true);
    return;
  } else {
    console.log(`is user inside lab? ${user.isInside}`)
    setBackgroundImg(Images.ACOLYTE_LAB);
  }
} 