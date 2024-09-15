import { create } from "zustand";

type UserType = {
  isLoggedIn: boolean;
  setIsLoggedIn: ()=>void;
}


export const useUserLoginState = create<UserType>((set)=>({  
  isLoggedIn: false,  
  setIsLoggedIn: ()=>{
    set((state)=>({isLoggedIn: !state.isLoggedIn}));
  }
}))