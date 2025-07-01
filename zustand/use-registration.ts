import { create } from 'zustand';

interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  loadingRegister: boolean;
  errorRegister: string | null;
  registerSuccess: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  requestRegister: () => Promise<void>;
}

export const useRegister = create<RegisterState>((set) => ({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  loadingRegister: false,
  errorRegister: null,
  registerSuccess: false,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  requestRegister: async () => {
    set({ loadingRegister: true, errorRegister: null });
    try {
      // Replace with your actual registration API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: useRegister.getState().name,
          email: useRegister.getState().email,
          password: useRegister.getState().password,
        }),
      });

      const data = await response.json();

      console.log("data", data);
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      } else {
        set({ registerSuccess: true });
      }

    } catch (error) {
      set({ errorRegister: error instanceof Error ? error.message : 'Registration failed' });
    } finally {
      set({ loadingRegister: false });
    }
  },
}));