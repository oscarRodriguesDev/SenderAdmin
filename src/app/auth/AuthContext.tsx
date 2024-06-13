'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isUserLoggedIn } from './authEmail'; // Ajuste o caminho conforme necessário

interface AuthContextType {
  loggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLoggedIn = await isUserLoggedIn();
      setLoggedIn(isLoggedIn);
      setLoading(false);
    };

   checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.log('contexto indefinido');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  console.log('contexto ' + context.loggedIn + "encontrado");
  return context;
}
 