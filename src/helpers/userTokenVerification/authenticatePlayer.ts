import { CURRENT_ROUTE, Routes } from "../constants/constants";
import { AuthenticatePlayerReturnValue } from "../interfaces/auth.helpers";

export async function authenticatePlayer(endpoint: string, idToken: string): Promise<AuthenticatePlayerReturnValue> {
  const FETCH_ROUTE = `${CURRENT_ROUTE}${endpoint}`;

  console.log("User's account authentication process has started...");

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