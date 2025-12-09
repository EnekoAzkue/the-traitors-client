import { ApiEndpoints, CURRENT_ROUTE } from "../constants/constants";


const getAllAcolytes = async () => {
  console.log("Preparing to get all acolytes");
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
