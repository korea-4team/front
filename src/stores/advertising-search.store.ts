import { create } from "zustand";

interface AdvertisingSearchStore {
  location: string;
  businessType: string;

  setLocation: (location: string) => void;
  setBusinessType: (businessType: string) => void;
}

const useStore = create<AdvertisingSearchStore>((set) => ({
  location: '',
  businessType: '',

  setLocation: (location) => set((state) => ({...state, location})),
  setBusinessType: (businessType) => set((state) => ({...state, businessType})),
}));

export default useStore;