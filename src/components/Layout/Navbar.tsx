import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '知识题库', path: '/question-bank' },
  { label: '注意事项', path: '/tips' },
  { label: '地区推荐', path: '/region' },
  { label: '岗位推荐', path: '/position' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-primary-700 font-bold text-xl">
          考公助手
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors hover:text-gold-500 ${
                isActive(link.path)
                  ? 'text-gold-500 border-b-2 border-gold-500'
                  : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {user?.username}
                <span className="text-xs text-gray-400">({user?.role})</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                退出
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-primary-700 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-800"
            >
              登录
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-gray-600 hover:text-primary-700 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-gray-100 shadow-sm">
          <div className="px-4 py-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors hover:text-gold-500 ${
                  isActive(link.path)
                    ? 'text-gold-500 border-l-2 border-gold-500 bg-gold-50'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-1 border-t border-gray-100" />
            {isAuthenticated ? (
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <User className="h-4 w-4" />
                  {user?.username}
                  <span className="text-xs text-gray-400">({user?.role})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mx-3 rounded-lg bg-primary-700 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-800"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}