import { Routes } from "../constants/constants";

export async function authenticateUser(endpoint: string, idToken: string): Promise<number> {
  const { status: statusCode } = await fetch(
    `${Routes.LOCALHOST}${endpoint}`,
    {
      method: 'POST',
      body: JSON.stringify({ idToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return statusCode;
}