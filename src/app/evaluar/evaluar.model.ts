export interface Opcion {
  id: string;
  texto: string;
}

export interface Pregunta {
  id: number;
  texto: string;
  opciones: Opcion[];
  respuestaCorrecta: string; // id de la opción correcta: 'a', 'b', 'c' o 'd'
  respuestaEstudiante: string | null;
  esCorrecta: boolean | null;
}

export interface Evaluacion {
  id: number;
  titulo: string;
  preguntas: Pregunta[];
  fechaCreacion: Date;
  calificacionFinal: number | null;
  enviada: boolean;
}

export const CUESTIONARIO_PREDETERMINADO: Evaluacion = {
  id: 1,
  titulo: 'Evaluación de Análisis Numérico',
  fechaCreacion: new Date(),
  calificacionFinal: null,
  enviada: false,
  preguntas: [
    {
      id: 1,
      texto: '¿Cuál es la condición necesaria para aplicar el método de bisección?',
      opciones: [
        { id: 'a', texto: 'La función debe ser diferenciable en todo el intervalo' },
        { id: 'b', texto: 'La función debe ser continua y tener cambio de signo en [a,b]' },
        { id: 'c', texto: 'La función debe ser creciente en el intervalo' },
        { id: 'd', texto: 'La función debe tener exactamente una raíz' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 2,
      texto: '¿Qué fórmula utiliza el método de Newton-Raphson?',
      opciones: [
        { id: 'a', texto: 'x₁ = x₀ + f(x₀)/f\'(x₀)' },
        { id: 'b', texto: 'x₁ = x₀ · f\'(x₀)/f(x₀)' },
        { id: 'c', texto: 'x₁ = x₀ - f(x₀)/f\'(x₀)' },
        { id: 'd', texto: 'x₁ = (a + b) / 2' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 3,
      texto: '¿Para qué se utiliza el Polinomio de Taylor?',
      opciones: [
        { id: 'a', texto: 'Para encontrar raíces de ecuaciones no lineales' },
        { id: 'b', texto: 'Para resolver sistemas de ecuaciones lineales' },
        { id: 'c', texto: 'Para aproximar funciones complejas mediante polinomios' },
        { id: 'd', texto: 'Para calcular derivadas numéricas' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 4,
      texto: '¿Qué es el error de redondeo?',
      opciones: [
        { id: 'a', texto: 'El error al truncar una serie infinita en un número finito de términos' },
        { id: 'b', texto: 'El error por representar números con dígitos finitos en punto flotante' },
        { id: 'c', texto: 'El error producido al dividir por cero' },
        { id: 'd', texto: 'El error generado por una mala aproximación inicial' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 5,
      texto: '¿Cuál es la diferencia entre error absoluto y error relativo?',
      opciones: [
        { id: 'a', texto: 'El error absoluto se expresa en porcentaje y el relativo no' },
        { id: 'b', texto: 'El error relativo es la diferencia directa entre el valor real y el aproximado' },
        { id: 'c', texto: 'El error absoluto es la diferencia directa y el relativo es el cociente entre el error absoluto y el valor real' },
        { id: 'd', texto: 'Son lo mismo, solo cambia la unidad de medida' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 6,
      texto: '¿Qué significa que un método numérico converge?',
      opciones: [
        { id: 'a', texto: 'Que siempre encuentra la solución exacta' },
        { id: 'b', texto: 'Que las aproximaciones sucesivas se acercan cada vez más a la solución' },
        { id: 'c', texto: 'Que el método termina en un número fijo de iteraciones' },
        { id: 'd', texto: 'Que el error aumenta con cada iteración' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 7,
      texto: '¿Qué es el error de truncamiento?',
      opciones: [
        { id: 'a', texto: 'El error por usar aritmética de punto flotante' },
        { id: 'b', texto: 'El error por aproximar un proceso infinito con uno finito' },
        { id: 'c', texto: 'El error por una mala elección del intervalo inicial' },
        { id: 'd', texto: 'El error generado al invertir una matriz' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 8,
      texto: '¿En qué se diferencia el método de la secante del de Newton-Raphson?',
      opciones: [
        { id: 'a', texto: 'La secante usa la segunda derivada en lugar de la primera' },
        { id: 'b', texto: 'La secante no requiere calcular la derivada analíticamente' },
        { id: 'c', texto: 'La secante siempre converge más rápido' },
        { id: 'd', texto: 'La secante solo funciona para funciones lineales' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 9,
      texto: '¿Qué es la interpolación numérica?',
      opciones: [
        { id: 'a', texto: 'Calcular la derivada de una función en un punto' },
        { id: 'b', texto: 'Encontrar raíces de una función polinomial' },
        { id: 'c', texto: 'Estimar valores desconocidos entre datos conocidos' },
        { id: 'd', texto: 'Resolver integrales definidas numéricamente' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 10,
      texto: '¿Qué caracteriza a la interpolación de Lagrange?',
      opciones: [
        { id: 'a', texto: 'Construye un polinomio que pasa exactamente por todos los puntos dados' },
        { id: 'b', texto: 'Aproxima la función con líneas rectas entre puntos' },
        { id: 'c', texto: 'Solo funciona con datos equiespaciados' },
        { id: 'd', texto: 'Minimiza el error cuadrático medio' }
      ],
      respuestaCorrecta: 'a',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 11,
      texto: '¿Cuándo se usa la integración numérica?',
      opciones: [
        { id: 'a', texto: 'Cuando la función es un polinomio de grado bajo' },
        { id: 'b', texto: 'Cuando no se puede obtener la antiderivada analíticamente' },
        { id: 'c', texto: 'Cuando se necesita calcular derivadas de orden superior' },
        { id: 'd', texto: 'Solo cuando la función es periódica' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 12,
      texto: '¿En qué consiste la regla del trapecio?',
      opciones: [
        { id: 'a', texto: 'Aproxima el área bajo la curva usando rectángulos' },
        { id: 'b', texto: 'Aproxima el área bajo la curva usando parábolas' },
        { id: 'c', texto: 'Aproxima el área bajo la curva usando trapecios' },
        { id: 'd', texto: 'Aproxima el área bajo la curva usando triángulos' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 13,
      texto: '¿Qué ventaja tiene la regla de Simpson sobre la del trapecio?',
      opciones: [
        { id: 'a', texto: 'Es más fácil de implementar' },
        { id: 'b', texto: 'Requiere menos puntos de evaluación' },
        { id: 'c', texto: 'Logra mayor precisión usando parábolas en lugar de líneas rectas' },
        { id: 'd', texto: 'Funciona para funciones discontinuas' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 14,
      texto: '¿Qué método se usa para resolver sistemas de ecuaciones lineales por eliminación?',
      opciones: [
        { id: 'a', texto: 'Método de Euler' },
        { id: 'b', texto: 'Eliminación gaussiana' },
        { id: 'c', texto: 'Método de bisección' },
        { id: 'd', texto: 'Interpolación de Newton' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 15,
      texto: '¿Qué indica un número de condición alto en una matriz?',
      opciones: [
        { id: 'a', texto: 'Que la matriz es fácil de invertir' },
        { id: 'b', texto: 'Que el sistema tiene solución única' },
        { id: 'c', texto: 'Que pequeños errores en los datos se amplifican en la solución' },
        { id: 'd', texto: 'Que la matriz es ortogonal' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 16,
      texto: '¿Qué hace el método de Euler para resolver EDOs?',
      opciones: [
        { id: 'a', texto: 'Calcula la solución exacta usando la antiderivada' },
        { id: 'b', texto: 'Usa la derivada en el punto actual para estimar el siguiente valor' },
        { id: 'c', texto: 'Divide el intervalo a la mitad en cada iteración' },
        { id: 'd', texto: 'Resuelve el sistema usando matrices' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 17,
      texto: '¿Por qué el método de Runge-Kutta de orden 4 es mejor que el de Euler?',
      opciones: [
        { id: 'a', texto: 'Porque es más fácil de programar' },
        { id: 'b', texto: 'Porque calcula cuatro pendientes por paso y las promedia para mayor precisión' },
        { id: 'c', texto: 'Porque siempre converge en menos iteraciones' },
        { id: 'd', texto: 'Porque no necesita condiciones iniciales' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 18,
      texto: '¿Para qué se usa la norma de un vector en análisis numérico?',
      opciones: [
        { id: 'a', texto: 'Para calcular el determinante de una matriz' },
        { id: 'b', texto: 'Para medir errores y evaluar convergencia de métodos iterativos' },
        { id: 'c', texto: 'Para encontrar los valores propios de una matriz' },
        { id: 'd', texto: 'Para resolver integrales dobles' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 19,
      texto: '¿Qué es la factorización LU?',
      opciones: [
        { id: 'a', texto: 'Una técnica para encontrar raíces de polinomios' },
        { id: 'b', texto: 'Una descomposición de una matriz en dos matrices triangulares para resolver sistemas lineales' },
        { id: 'c', texto: 'Un método para calcular integrales numéricas' },
        { id: 'd', texto: 'Un algoritmo para ordenar vectores' }
      ],
      respuestaCorrecta: 'b',
      respuestaEstudiante: null,
      esCorrecta: null
    },
    {
      id: 20,
      texto: '¿Qué es el método de Gauss-Seidel?',
      opciones: [
        { id: 'a', texto: 'Un método directo para resolver sistemas lineales' },
        { id: 'b', texto: 'Un método para encontrar valores propios' },
        { id: 'c', texto: 'Un método iterativo para resolver sistemas de ecuaciones lineales' },
        { id: 'd', texto: 'Un método de integración numérica' }
      ],
      respuestaCorrecta: 'c',
      respuestaEstudiante: null,
      esCorrecta: null
    }
  ]
};