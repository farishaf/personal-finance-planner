"use client"

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);