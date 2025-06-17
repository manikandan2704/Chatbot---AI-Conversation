import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock API call - replace with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0]
          };
          
          const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);
          
          localStorage.setItem('auth_token', mockToken);
          localStorage.setItem('user_data', JSON.stringify(mockUser));
          
          setUser(mockUser);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock API call - replace with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password) {
          const mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name
          };
          
          const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);
          
          localStorage.setItem('auth_token', mockToken);
          localStorage.setItem('user_data', JSON.stringify(mockUser));
          
          setUser(mockUser);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};