import { Locations } from "../constants/constants";

export default interface NpcInterface {
  name        : string,
  isCaptured  : boolean,
  location    : Locations,
};