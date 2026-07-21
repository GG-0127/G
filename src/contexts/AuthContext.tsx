import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user database
const USERS: Record<string, { password: string; role: string }> = {
  admin: { password: 'admin123', role: '管理员' },
  user: { password: 'user123', role: '普通用户' },
  test: { password: 'test123', role: '测试用户' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kaogong_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('kaogong_user');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const u = USERS[username];
    if (u && u.password === password) {
      const userData = { username, role: u.role };
      setUser(userData);
      localStorage.setItem('kaogong_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kaogong_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}