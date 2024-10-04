import {create} from 'zustand';

type ButtonStateTypes = {
  pending: boolean;
  toggleButtonState: ()=>void;
}

export const useFormButtonStateToggle = create<ButtonStateTypes>((set)=>({
  pending: false,
  toggleButtonState: ()=>{
    set((state)=>({pending: !state.pending}));
  },
}))