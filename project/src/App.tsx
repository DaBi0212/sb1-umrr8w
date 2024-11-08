import { BookOpen, GraduationCap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { EventoForm } from './components/EventoForm';
import { Header } from './components/Header';
import { ListaEventos } from './components/ListaEventos';
import { useTheme } from './context/ThemeContext';
import { Examen, Tarea, TipoEvento } from './types';

function App() {
  const { config } = useTheme();
  const [tareas, setTareas] = useState<Tarea[]>(() => {
    const saved = localStorage.getItem('tareas');
    return saved ? JSON.parse(saved) : [];
  });
  const [examenes, setExamenes] = useState<Examen[]>(() => {
    const saved = localStorage.getItem('examenes');
    return saved ? JSON.parse(saved) : [];
  });
  const [tipoActivo, setTipoActivo] = useState<TipoEvento>('tarea');

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    localStorage.setItem('examenes', JSON.stringify(examenes));
  }, [tareas, examenes]);

  const handleNuevaTarea = (tarea: Tarea) => {
    setTareas((prev) => [...prev, tarea]);
  };

  const handleNuevoExamen = (examen: Examen) => {
    setExamenes((prev) => [...prev, examen]);
  };

  const toggleCompletado = (id: string) => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarEvento = (id: string) => {
    if (tipoActivo === 'tarea') {
      setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
    } else {
      setExamenes((prev) => prev.filter((examen) => examen.id !== id));
    }
  };

  return (
    <div className={`min-h-screen ${config.background}`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setTipoActivo('tarea')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full ${
              tipoActivo === 'tarea'
                ? `${config.primary} text-white`
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Tareas</span>
          </button>
          <button
            onClick={() => setTipoActivo('examen')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full ${
              tipoActivo === 'examen'
                ? `${config.primary} text-white`
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <GraduationCap className="h-5 w-5" />
            <span>Exámenes</span>
          </button>
        </div>

        <div className="grid md:grid-cols-[350px,1fr] gap-8">
          <div>
            <EventoForm
              tipo={tipoActivo}
              onSubmit={tipoActivo === 'tarea' ? handleNuevaTarea : handleNuevoExamen}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {tipoActivo === 'tarea' ? 'Mis Tareas' : 'Mis Exámenes'}
            </h2>
            <ListaEventos
              eventos={tipoActivo === 'tarea' ? tareas : examenes}
              tipo={tipoActivo}
              onToggleCompletado={tipoActivo === 'tarea' ? toggleCompletado : undefined}
              onEliminar={eliminarEvento}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;