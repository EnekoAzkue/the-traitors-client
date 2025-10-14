import KaotikaPlayer from './KaotikaPlayer';

interface AuthenticatePlayerReturnValue {
  statusCode: number;
  player: KaotikaPlayer | null;
}

export type { AuthenticatePlayerReturnValue };
