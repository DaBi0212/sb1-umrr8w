import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeConfig } from '../types';

const themeConfigs: Record<Theme, ThemeConfig> = {
  indigo: {
    primary: 'bg-indigo-600',
    hover: 'hover:bg-indigo-700',
    text: 'text-indigo-600',
    background: 'bg-indigo-50',
  },
  emerald: {
    primary: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    text: 'text-emerald-600',
    background: 'bg-emerald-50',
  },
  rose: {
    primary: 'bg-rose-600',
    hover: 'hover:bg-rose-700',
    text: 'text-rose-600',
    background: 'bg-rose-50',
  },
  amber: {
    primary: 'bg-amber-600',
    hover: 'hover:bg-amber-700',
    text: 'text-amber-600',
    background: 'bg-amber-50',
  },
};

interface ThemeContextType {
  theme: Theme;
  config: ThemeConfig;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'indigo';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = {
    theme,
    config: themeConfigs[theme],
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}