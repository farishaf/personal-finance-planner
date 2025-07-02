import { create } from 'zustand'

interface PlacementState {
    loadingPlacement: boolean;
    errorPlacement: boolean;
    name: string;
    tag: string;
    color: string;
    createPlacement: () => Promise<void>;
    setName: (name: string) => void;
    setTag: (tag: string) => void;
    setColor: (color: string) => void;
}

const useLogin = create<PlacementState>((set, get) => ({
  loadingPlacement: false,
  errorPlacement: false,
  name: "",
  tag: "",
  color: "",
  setName: (name: string) => set({ name: name }),
  setTag: (tag: string) => set({ tag: tag }),
  setColor: (color: string) => set({ color: color }),
  createPlacement: async () => {
      try {
        
      } catch (error) {
        
      } finally {
        
      }
  }
}));

export default useLogin;