import { Routes } from "../constants/constants";
import { AuthenticatePlayerReturnValue } from "../interfaces/auth.helpers";

export async function authenticatePlayer(endpoint: string,idToken: string,): Promise<AuthenticatePlayerReturnValue> {
  console.log("Login button pressed to authenticate");
  const response = await fetch(
    `${Routes.RENDER}${endpoint}`,
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