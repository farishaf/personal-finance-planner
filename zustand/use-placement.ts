/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface PlacementState {
  loadingPlacement: boolean;
  errorPlacement: boolean;
  name: string;
  tag: string;
  color: string;
  placementList: any[];
  placementPage: number;
  totalPlacement: number;
  createPlacement: () => Promise<{ success: boolean; data?: any; error?: string }>;
  setName: (name: string) => void;
  setTag: (tag: string) => void;
  setColor: (color: string) => void;
  reset: () => void;
  getPlacement: () => void;
}

const usePlacement = create<PlacementState>((set, get) => ({
  loadingPlacement: false,
  errorPlacement: false,
  name: "",
  tag: "",
  color: "blue", // default color
  placementList: [],
  placementPage: 1,
  totalPlacement: 10,
  setName: (name: string) => set({ name }),
  setTag: (tag: string) => set({ tag }),
  setColor: (color: string) => set({ color }),
  reset: () => set({ name: "", tag: "", color: "slate" }),
  createPlacement: async () => {
    try {
      set({ loadingPlacement: true, errorPlacement: false });

      const { name, tag, color } = get();

      const response = await fetch('/api/placement/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          name,
          color,
          placementTag: tag,
          isActive: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create placement');
      }

      const data = await response.json();
      set({ loadingPlacement: false });
      return { success: true, data };

    } catch (error: any) {
      set({ errorPlacement: true, loadingPlacement: false });
      return { success: false, error: error.message };
    } finally {
      set({ loadingPlacement: false });
    }
  },
  getPlacement: async () => {
    try {
      set({ loadingPlacement: true });

      const response = await fetch('/api/placement', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create placement');
      }

      const responseData = await response.json();
      console.log("response data", responseData);
      set({ placementList: responseData.data, totalPlacement: responseData.total });

    } catch (error: any) {
      set({ errorPlacement: true, loadingPlacement: false });
      return { success: false, error: error.message };
    } finally {
      set({ loadingPlacement: false });
    }
  },
}));

export default usePlacement;