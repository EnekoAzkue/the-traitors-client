import { createContext } from 'react';
import { SetModalMessage } from './Modal';

export const ModalContext = createContext<SetModalMessage | null>(null);