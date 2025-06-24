import { create } from 'zustand'

interface LoginState {
    loadingLogin: boolean;
    errorLogin: boolean;
    username: string;
    password: string;
    login: () => Promise<void>;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
}

const useLogin = create<LoginState>((set, get) => ({
  loadingLogin: false,
  errorLogin: false,
  username: "",
  password: "",
  setUsername: (username: string) => set({ username: username }),
  setPassword: (password: string) => set({ password: password }),
  login: async () => {
    const userName = get().username
    const drowssap = get().password
    if (!userName) {
      alert("Please enter your username.");
      return;
    }
    if (!drowssap) {
      alert("Please enter your password.");
      return;
    }

    set({ loadingLogin: true });

    try {
    //   const response = await axios.post("/api/auth/login", {
    //     username: "super_admin",
    //     password: "12345678"
    //   });

      console.log("Login success");
      window.location.href = "/";
    } catch (error: unknown) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    } finally {
        set({ loadingLogin: false });
    }
  },
}));

export default useLogin;