import { ApiEndpoints, CURRENT_ROUTE } from "../constants/constants";


const getAllAcolytes = async () => {
  const endpoint    = ApiEndpoints.GET_ALL_ACOLYTES;
  const FETCH_ROUTE = `${CURRENT_ROUTE}${endpoint}`;
  
  const response = await fetch(
    FETCH_ROUTE, 
    {
      method: "GET",
    }
  ); 

  return response;
};

export default getAllAcolytes;
