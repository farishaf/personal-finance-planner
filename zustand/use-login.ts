import axios from 'axios';
import { create } from 'zustand'

interface LoginState {
    loadingLogin: boolean;
    errorLogin: boolean;
    email: string;
    password: string;
    requestLogin: () => Promise<void>;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const useLogin = create<LoginState>((set, get) => ({
  loadingLogin: false,
  errorLogin: false,
  email: "",
  password: "",
  setEmail: (email: string) => set({ email: email }),
  setPassword: (password: string) => set({ password: password }),
  requestLogin: async () => {
    const email = get().email
    const drowssap = get().password
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!drowssap) {
      alert("Please enter your password.");
      return;
    }

    set({ loadingLogin: true });

    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: drowssap
      });
      if (response.status !== 200) {
        console.error("Login failed", response);
        set({ errorLogin: true });
        return;
      }
      if (response.status === 200) {
        const token = response.data.response.token;
        localStorage.setItem("accessToken", token);
      }

    } catch (error: unknown) {
      console.error("Login failed", error);
      set({ errorLogin: true });
    } finally {
        set({ loadingLogin: false });
    }
  },
}));

export default useLogin;