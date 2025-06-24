"use client"

import { createContext, useState} from 'react'

interface AuthContextType {
    username: string | null;
    role: number | null;
    token: string | null;
    setUsername: (username: string) => void;
    setRole: (role: number) => void;
    setToken: (token: string) => void;
};

const defaultAuthContext: AuthContextType = {
    username: null,
    role: null,
    token: null,
    setUsername: () => {},
    setRole: () => {},
    setToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState(0); 
    const [token, setToken] = useState("");

    return (
        <AuthContext.Provider
             value={{username, setUsername, role, setRole, token, setToken, }}
            >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;