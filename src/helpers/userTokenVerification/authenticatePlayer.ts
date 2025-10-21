import { Routes } from "../constants/constants";
import { AuthenticatePlayerReturnValue } from "../interfaces/auth.helpers";

export async function authenticatePlayer(endpoint: string,idToken: string,): Promise<AuthenticatePlayerReturnValue> {
  const FETCH_ROUTE = `${Routes.RENDER}${endpoint}`;
  const ALT_ROUTE = `http://---INSERT_IPv4---:3000/player/${endpoint}`

  console.log("Login button pressed to authenticate");

  const response = await fetch(
    FETCH_ROUTE,
    {
      method: 'POST',
      body: JSON.stringify({ idToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const authenticationAttemptResult: AuthenticatePlayerReturnValue = {
    statusCode: response.status,
    player: null,
  };

  if (response.ok) {
    const { player } = await response.json();
    authenticationAttemptResult.player = player;
  }

  return authenticationAttemptResult;
}