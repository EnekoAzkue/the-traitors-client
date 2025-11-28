import { Images } from "../../../../../constants/constants";
import KaotikaPlayer from "../../../../KaotikaPlayer";


export interface GetAcolyteLabAccessParams {
  user: KaotikaPlayer,
  setBackgroundImg: (value: React.SetStateAction<Images>) => void,
  setAccesedIn: (value: React.SetStateAction<boolean>) => void,
}