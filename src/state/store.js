import { create } from "zustand";

export const CurrencyStore = create((set) => ({
    currency : 'usd',
    setCurrency : (newCurrency) => set((state)=>{
            return{
                ...state,
                curency : newCurrency
            }
    })
}));