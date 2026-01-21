import { CURRENT_DOMAIN } from "../constants/constants";

export const getAngelo = async () => {
  const endpoint = `angelo/get-angelo`;
  const FETCH_ROUTE = `${CURRENT_DOMAIN}${endpoint}`;
  const response = await fetch(
    FETCH_ROUTE, 
    {
      method: "GET",
    }
  ); 
  return response;
}