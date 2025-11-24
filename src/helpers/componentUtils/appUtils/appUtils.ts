import { getFCMToken } from "../../firebaseCloudMessages/pushNotifications";
import KaotikaPlayer from "../../interfaces/KaotikaPlayer";
import getAllAcolytes from "../../serverRequests/getAllAcolytes";

interface getAcolytesParams {
  setAllAcolytes: (acolytes: KaotikaPlayer[] | undefined) => void,
};

export const getAcolytes = async ({ setAllAcolytes }: getAcolytesParams) => {
  // Get all acolytes: 
  const response = await getAllAcolytes();
  let acolytes = null;

  if (response.status === 200) {
    acolytes = await response.json();
    setAllAcolytes(acolytes);
  } else {
    throw new Error("Error happened while client was trying to get all acolytes from server.");
  }
}

interface appUserState {
  user: KaotikaPlayer,
  setUser: (newUser: KaotikaPlayer | null) => void
}

export const updateUserStateWithPushToken = async ({ user, setUser }: appUserState) => {
  console.log("Injecting Push Notification Token to the user");
  console.log("User is actually:", user);
  const userPushToken = user;
  if (userPushToken) userPushToken.pushToken = await getFCMToken();
  setUser(userPushToken);
};