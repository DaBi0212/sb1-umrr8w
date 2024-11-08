import { Palette } from 'lucide-react';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { Theme } from '../types';

const themes: { value: Theme; label: string }[] = [
  { value: 'indigo', label: 'Índigo' },
  { value: 'emerald', label: 'Esmeralda' },
  { value: 'rose', label: 'Rosa' },
  { value: 'amber', label: 'Ámbar' },
];

export function ThemeSelector() {
  const { theme, setTheme, config } = useTheme();

  return (
    <div className="relative group">
      <button
        className={`p-2 rounded-full ${config.text} hover:${config.background} transition-colors`}
        aria-label="Cambiar tema"
      >
        <Palette className="h-6 w-6" />
      </button>
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {themes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
              theme === value ? config.text : ''
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}