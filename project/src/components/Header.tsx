import { BookOpen, Calendar } from 'lucide-react';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  const { config } = useTheme();

  return (
    <header className={`${config.primary} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8" />
            <h1 className="ml-2 text-xl font-bold">Agenda Escolar</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="h-6 w-6" />
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
}