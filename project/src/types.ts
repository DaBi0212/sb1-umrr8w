export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  materia: string;
  completada: boolean;
}

export interface Examen {
  id: string;
  titulo: string;
  materia: string;
  fecha: string;
  hora: string;
  salon?: string;
}

export type TipoEvento = 'tarea' | 'examen';

export type Theme = 'indigo' | 'emerald' | 'rose' | 'amber';

export interface ThemeConfig {
  primary: string;
  hover: string;
  text: string;
  background: string;
}