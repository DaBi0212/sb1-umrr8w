import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { TipoEvento } from '../types';

interface EventoFormProps {
  tipo: TipoEvento;
  onSubmit: (evento: any) => void;
}

export function EventoForm({ tipo, onSubmit }: EventoFormProps) {
  const { config } = useTheme();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [materia, setMateria] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoEvento = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      fecha,
      materia,
      hora,
      completada: false,
    };
    onSubmit(nuevoEvento);
    setTitulo('');
    setDescripcion('');
    setFecha('');
    setMateria('');
    setHora('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {tipo === 'tarea' ? 'Nueva Tarea' : 'Nuevo Examen'}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:${config.text} focus:border-transparent`}
          required
        />
        {tipo === 'tarea' && (
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:${config.text} focus:border-transparent`}
          />
        )}
        <input
          type="text"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:${config.text} focus:border-transparent`}
          required
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={`flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:${config.text} focus:border-transparent`}
            required
          />
          {tipo === 'examen' && (
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className={`flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 focus:${config.text} focus:border-transparent`}
              required
            />
          )}
        </div>
        <button
          type="submit"
          className={`w-full ${config.primary} text-white py-2 px-4 rounded-md ${config.hover} flex items-center justify-center gap-2`}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Agregar {tipo === 'tarea' ? 'Tarea' : 'Examen'}</span>
        </button>
      </div>
    </form>
  );
}