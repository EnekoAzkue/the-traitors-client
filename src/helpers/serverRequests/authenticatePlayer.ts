import { CURRENT_ROUTE } from "../constants/constants";
import { AuthenticatePlayerReturnValue } from "../interfaces/serverRequestInterfaces/auth.helpers";

export async function authenticatePlayer(endpoint: string, idToken: string): Promise<AuthenticatePlayerReturnValue> {
  const FETCH_ROUTE = `${CURRENT_ROUTE}${endpoint}`;

  const bodyValue = JSON.stringify({ idToken });

  const response = await fetch(
    FETCH_ROUTE,
    {
      method: 'POST',
      body: bodyValue,
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