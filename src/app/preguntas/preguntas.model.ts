export interface PreguntaTeorica {
  id: number;
  texto: string;
  respuestaCorrecta: string;
}

export interface PruebaGeneral {
  id: number;
  titulo: string;
  preguntas: PreguntaTeorica[];
  fechaCreacion: Date;
}
