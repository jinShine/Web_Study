import { create } from "zustand";

type UIStateType = {
  homeCategory: string;
  headerImageSrc: string;

  setHomeCategory: (value: string) => void;
  setHeaderImageSrc: (src: string) => void;
};

const useUIState = create<UIStateType>((set) => ({
  homeCategory: "",
  setHomeCategory: (value: string) => {
    set({ homeCategory: value });
  },

  headerImageSrc:
    "https://images.unsplash.com/photo-1712971404210-658cb22c84fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  setHeaderImageSrc: (src: string) => {
    set({ headerImageSrc: src });
  },
}));

export default useUIState;
