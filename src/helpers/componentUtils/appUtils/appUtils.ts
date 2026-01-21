import { getFCMToken } from "../../firebaseCloudMessages/pushNotifications";
import KaotikaPlayer from "../../interfaces/KaotikaPlayer";
import NpcInterface from "../../interfaces/Npc";
import getAllAcolytes from "../../serverRequests/getAllAcolytes";
import { getAngelo } from "../../serverRequests/getAngelo";
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

export async function getAngeloJSON() : Promise<NpcInterface | null>{
  try{
    const angelo = await getAngelo();
    if(angelo === null) {throw new Error(`An error happened while fetching angelo's data from DB, angelo is null.`);}
    if(angelo.ok) {
      const angeloJSON = await angelo.json();
      return angeloJSON;
    }else{
      throw new Error(`An error happened while fetching angelo's data from DB, couldn't get angelo's JSON.`);
    }
  }catch(error: any){
    console.error(`ERROR!\n${error}`);
    return null;
  }
}

export const updateUserStateWithPushToken = async ( user : KaotikaPlayer) => {

  const userPushToken = user;
  if (userPushToken) userPushToken.pushToken = await getFCMToken();
  return userPushToken;
};