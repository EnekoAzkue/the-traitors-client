import { ApiEndpoints, CURRENT_ROUTE } from "../constants/constants";


const getBetrayerAcolytes = async () => {
  const endpoint    = ApiEndpoints.GET_BETRAYERS;
  const FETCH_ROUTE = `${CURRENT_ROUTE}${endpoint}`;
  
  const response = await fetch(
    FETCH_ROUTE, 
    {
      method: "GET",
    }
  ); 

  return response;
};

export default getBetrayerAcolytes;
