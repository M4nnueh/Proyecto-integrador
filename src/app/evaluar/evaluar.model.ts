export interface Pregunta {
  id: number;
  texto: string;
  respuestaCorrecta: string;
  calificacion: number | null;
}

export interface Evaluacion {
  id: number;
  titulo: string;
  preguntas: Pregunta[];
  fechaCreacion: Date;
  calificacionFinal: number | null;
}