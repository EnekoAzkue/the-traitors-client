import { createContext } from 'react';
import { SetModalMessage } from '../interfaces/Modal';
import KaotikaPlayer from '../interfaces/KaotikaPlayer';

export const ModalContext = createContext<SetModalMessage | null>(null);
export const UserContext = createContext<[KaotikaPlayer, (newUser: KaotikaPlayer | null) => void] | null>(null);
export const AllAcolytesContext = createContext<[KaotikaPlayer[] | null, (newAllAcolytesList: KaotikaPlayer[] | null) => void] | null >(null);