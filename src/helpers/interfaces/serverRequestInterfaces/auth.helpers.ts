import KaotikaPlayer from '../KaotikaPlayer';

interface AuthenticatePlayerReturnValue {
  statusCode: number;
  player: KaotikaPlayer | null;
  token: any;
}

export type { AuthenticatePlayerReturnValue };
