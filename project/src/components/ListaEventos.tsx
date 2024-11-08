import { CheckCircle2, Clock, GraduationCap, Trash2 } from 'lucide-react';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Examen, Tarea, TipoEvento } from '../types';

interface ListaEventosProps {
  eventos: (Tarea | Examen)[];
  tipo: TipoEvento;
  onToggleCompletado?: (id: string) => void;
  onEliminar: (id: string) => void;
}

export function ListaEventos({
  eventos,
  tipo,
  onToggleCompletado,
  onEliminar,
}: ListaEventosProps) {
  const { config } = useTheme();

  return (
    <div className="space-y-4">
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <GraduationCap className={`h-5 w-5 ${config.text}`} />
                <h3 className="font-semibold text-lg">{evento.titulo}</h3>
              </div>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">{evento.materia}</p>
                {'descripcion' in evento && (
                  <p className="text-gray-500">{evento.descripcion}</p>
                )}
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(evento.fecha).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {'hora' in evento && ` - ${evento.hora}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {tipo === 'tarea' && onToggleCompletado && (
                <button
                  onClick={() => onToggleCompletado(evento.id)}
                  className={`p-2 rounded-full ${
                    'completada' in evento && evento.completada
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <CheckCircle2 className="h-6 w-6" />
                </button>
              )}
              <button
                onClick={() => onEliminar(evento.id)}
                className="p-2 text-red-500 hover:text-red-600 rounded-full"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}