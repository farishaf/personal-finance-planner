/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface CategoryState {
  loadingCategory: boolean;
  errorCategory: boolean;
  name: string;
  icon: string;
  categoryList: any[];
  categoryPage: number;
  totalCategory: number;
  createCategory: () => Promise<{ success: boolean; data?: any; error?: string }>;
  setName: (name: string) => void;
  setIcon: (icon: string) => void;
  reset: () => void;
  getCategory: (namesOnly: boolean) => void;
}

const useCategory = create<CategoryState>((set, get) => ({
  loadingCategory: false,
  errorCategory: false,
  name: "",
  icon: "",
  categoryList: [],
  categoryPage: 1,
  totalCategory: 10,
  setName: (name: string) => set({ name }),
  setIcon: (icon: string) => set({ icon }),
  reset: () => set({ name: "" }),
  createCategory: async () => {
    try {
      set({ loadingCategory: true, errorCategory: false });

      const { name, icon } = get();

      const response = await fetch('/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          name,
          icon,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }

      const data = await response.json();
      set({ loadingCategory: false });
      return { success: true, data };

    } catch (error: any) {
      set({ errorCategory: true, loadingCategory: false });
      return { success: false, error: error.message };
    } finally {
      set({ loadingCategory: false });
    }
  },
  getCategory: async (namesOnly: boolean) => {
    try {
      set({ loadingCategory: true });

      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            namesOnly
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }

      const responseData = await response.json();
      console.log("response data", responseData);
      if (!namesOnly) {
        set({ categoryList: responseData.data, totalCategory: responseData.total });
      } else {
        set({ categoryList: responseData.names, totalCategory: responseData.names.length });
      }

    } catch (error: any) {
      set({ errorCategory: true, loadingCategory: false });
      return { success: false, error: error.message };
    } finally {
      set({ loadingCategory: false });
    }
  },
}));

export default useCategory;