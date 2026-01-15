import { getFCMToken } from "../../firebaseCloudMessages/pushNotifications";
import KaotikaPlayer from "../../interfaces/KaotikaPlayer";
import getAllAcolytes from "../../serverRequests/getAllAcolytes";
import getBetrayerAcolytes from "../../serverRequests/getBetrayerAcolytes";
import getLoyalAcolytes from "../../serverRequests/getLoyalAcolytes";

interface getAcolytesParams {
  setAllAcolytes: (acolytes: KaotikaPlayer[] | undefined) => void,
};

export const getAcolytes = async () => {
  try {
    const responses = await Promise.all([
      getAllAcolytes(),
      getLoyalAcolytes(),
      getBetrayerAcolytes()
    ]);

    const acolyteTypes: KaotikaPlayer[][] = await Promise.all(
      responses.map(r => r.json())
    );

    return acolyteTypes;

  } catch (error) {
    throw new Error("Error happened while client was trying to get all acolytes from server.");    
  }
}

export const updateUserStateWithPushToken = async ( user : KaotikaPlayer) => {

  const userPushToken = user;
  if (userPushToken) userPushToken.pushToken = await getFCMToken();
  return userPushToken;
};