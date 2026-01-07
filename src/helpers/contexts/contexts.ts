import { createContext } from 'react';
import { SetModalMessage } from '../interfaces/components/Modal';
import KaotikaPlayer from '../interfaces/KaotikaPlayer';
import Artifact from '../interfaces/Artifact';

export const ModalContext = createContext<SetModalMessage | null>(null);
export const AllAcolytesContext = createContext<[KaotikaPlayer[] | undefined, (newAllAcolytesList: KaotikaPlayer[] | undefined) => void] | null >(null);
export const LoyalAcolytesContext = createContext<[KaotikaPlayer[] | undefined, (newAllAcolytesList: KaotikaPlayer[] | undefined) => void] | null >(null);
export const BetrayerAcolytesContext = createContext<[KaotikaPlayer[] | undefined, (newAllAcolytesList: KaotikaPlayer[] | undefined) => void] | null >(null);

export const InventoryContext = createContext<[boolean, (isOpen: boolean) => void]>([false, () => {}]);
export const CollectionContext = createContext<[boolean, (areCollected: boolean) => void]>([false, () => {}])

// Acolyte context for map and navigator: 
export const AcolyteInitialScreenContext  = createContext<[string | null, (newScreen: string | null) => void] | null>(null);
export const MortimerInitialScreenContext = createContext<[string, (newScreen: string) => void] | null>(null);
export const IstvanInitialScreenContext   = createContext<[string, (newScreen: string) => void] | null>(null);
export const VillainInitialScreenContext  = createContext<[string, (newScreen: string) => void] | null>(null);


export const ScrollContext = createContext<[boolean, (value: boolean) => void] | null>(null);

// AcolyteToastText context
export const AcolyteToastTextContext = createContext<[string, (newToastText: string ) => void] | null>(null);


// MortimerToastText context 
export const MortimerToastTextContext = createContext<[string, (newToastText: string ) => void] | null>(null);