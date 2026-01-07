import { ApiEndpoints, CURRENT_ROUTE } from "../constants/constants";


const getLoyalAcolytes = async () => {
  const endpoint    = ApiEndpoints.GET_LOYALS;
  const FETCH_ROUTE = `${CURRENT_ROUTE}${endpoint}`;
  
  const response = await fetch(
    FETCH_ROUTE, 
    {
      method: "GET",
    }
  ); 

  return response;
};

export default getLoyalAcolytes;
