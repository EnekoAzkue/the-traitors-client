import { createContext } from 'react';
import { SetModalMessage } from '../interfaces/Modal';
import KaotikaPlayer from '../interfaces/KaotikaPlayer';

export const ModalContext = createContext<SetModalMessage | null>(null);
export const UserContext = createContext<[KaotikaPlayer, (newUser: KaotikaPlayer | null) => void] | null>(null);
export const AllAcolytesContext = createContext<[KaotikaPlayer[] | undefined, (newAllAcolytesList: KaotikaPlayer[] | undefined) => void] | null >(null);



// Acolyte context for map and navigator: 
export const AcolyteInitialScreenContext = createContext<[string | null, (newScreen: string) => void] | null>(null);