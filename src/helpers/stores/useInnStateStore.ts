import {create} from 'zustand';
import { INN_STATES } from '../constants/constants';

interface InnStore { 
  innState: number;
  setInnState: (state: number) => void;
}


export const useInnStore = create<InnStore>((set) => ({
  innState: INN_STATES.SHOW_BETRAYER_MODAL,
  setInnState: (state) => set({innState: state}),
}));