import { CURRENT_DOMAIN } from "../constants/constants";

export const getAngelo = async () => {
  const FETCH_ROUTE = `${CURRENT_DOMAIN}/angelo/get-angelo`;
  const response = await fetch(
    FETCH_ROUTE, 
    {
      method: "GET",
    }
  ); 
  return response;
}