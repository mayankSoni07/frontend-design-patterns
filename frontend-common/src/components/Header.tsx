import React from 'react';
import { Button } from './Button';

export interface HeaderProps {
  title?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'MicroFrontend App',
  user,
  onLogin,
  onLogout,
  onProfileClick,
  className = '',
}) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onProfileClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  {user.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
