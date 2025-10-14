export async function authenticateUser(endpoint: string, idToken: string): Promise<number> {
  const { status: statusCode } = await fetch(
    `http://10.50.0.50:6001/user/${endpoint}`,
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