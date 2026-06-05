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

export const CUESTIONARIO_PREDETERMINADO: Evaluacion = {
  id: 1,
  titulo: 'Evaluación de Análisis Numérico',
  fechaCreacion: new Date(),
  calificacionFinal: null,
  preguntas: [
    {
      id: 1,
      texto: '¿Qué es el método de bisección y cuál es su principal característica?',
      respuestaCorrecta: 'Es un método numérico para encontrar raíces de funciones continuas. Divide repetidamente un intervalo a la mitad y selecciona el subintervalo donde ocurre el cambio de signo, garantizando convergencia si la función es continua.',
      calificacion: null
    },
    {
      id: 2,
      texto: '¿En qué consiste el método de Newton-Raphson?',
      respuestaCorrecta: 'Es un método iterativo que usa la derivada de la función. Parte de una aproximación inicial y aplica la fórmula x₁ = x₀ - f(x₀)/f\'(x₀) hasta converger a la raíz.',
      calificacion: null
    },
    {
      id: 3,
      texto: '¿Qué es el Polinomio de Taylor y para qué se utiliza?',
      respuestaCorrecta: 'Es una aproximación polinomial de una función alrededor de un punto. Se utiliza para aproximar funciones complejas mediante sumas de potencias, facilitando cálculos numéricos.',
      calificacion: null
    },
    {
      id: 4,
      texto: '¿Qué es el error de redondeo en análisis numérico?',
      respuestaCorrecta: 'Es el error que ocurre cuando un número no puede representarse exactamente en el sistema de punto flotante. Se produce por la cantidad finita de dígitos disponibles para representar números reales.',
      calificacion: null
    },
    {
      id: 5,
      texto: '¿Cuál es la diferencia entre error absoluto y error relativo?',
      respuestaCorrecta: 'El error absoluto es la diferencia entre el valor aproximado y el valor real. El error relativo es el cociente entre el error absoluto y el valor real, más útil para comparar precisiones.',
      calificacion: null
    },
    {
      id: 6,
      texto: '¿Qué condición debe cumplirse para aplicar el método de bisección?',
      respuestaCorrecta: 'La función debe ser continua en el intervalo [a,b] y debe existir un cambio de signo, es decir f(a)·f(b) < 0, lo que garantiza la existencia de al menos una raíz en el intervalo.',
      calificacion: null
    },
    {
      id: 7,
      texto: '¿Qué es la convergencia en un método numérico iterativo?',
      respuestaCorrecta: 'Es la propiedad por la cual las aproximaciones sucesivas se acercan cada vez más a la solución exacta. Un método converge cuando el error entre iteraciones tiende a cero.',
      calificacion: null
    },
    {
      id: 8,
      texto: '¿Qué es el error de truncamiento?',
      respuestaCorrecta: 'Es el error producido al aproximar un proceso matemático infinito con uno finito, como cuando se trunca una serie de Taylor en un número finito de términos en lugar de usar todos los infinitos.',
      calificacion: null
    },
    {
      id: 9,
      texto: '¿En qué se diferencia el método de la secante del método de Newton-Raphson?',
      respuestaCorrecta: 'El método de la secante aproxima la derivada usando dos puntos anteriores en lugar de calcularla analíticamente, lo que lo hace útil cuando la derivada es difícil de obtener.',
      calificacion: null
    },
    {
      id: 10,
      texto: '¿Qué es la interpolación numérica?',
      respuestaCorrecta: 'Es el proceso de estimar valores desconocidos entre datos conocidos. A partir de un conjunto de puntos se construye una función que pasa por ellos y permite calcular valores intermedios.',
      calificacion: null
    },
    {
      id: 11,
      texto: '¿Qué es la interpolación de Lagrange?',
      respuestaCorrecta: 'Es un método de interpolación polinomial que construye un polinomio único de grado n que pasa exactamente por n+1 puntos dados, usando los polinomios base de Lagrange.',
      calificacion: null
    },
    {
      id: 12,
      texto: '¿Qué es la integración numérica y cuándo se usa?',
      respuestaCorrecta: 'Es el conjunto de métodos para calcular aproximadamente el valor de una integral definida cuando no es posible obtener la antiderivada analíticamente o la función solo se conoce en puntos discretos.',
      calificacion: null
    },
    {
      id: 13,
      texto: '¿En qué consiste la regla del trapecio?',
      respuestaCorrecta: 'Es un método de integración numérica que aproxima el área bajo la curva usando trapecios. Divide el intervalo en subintervalos y aproxima la función por líneas rectas entre los puntos extremos.',
      calificacion: null
    },
    {
      id: 14,
      texto: '¿Qué es la regla de Simpson?',
      respuestaCorrecta: 'Es un método de integración numérica que aproxima la función con polinomios de segundo grado (parábolas) en lugar de líneas rectas, logrando mayor precisión que la regla del trapecio.',
      calificacion: null
    },
    {
      id: 15,
      texto: '¿Qué es un sistema de ecuaciones lineales y cómo se resuelve numéricamente?',
      respuestaCorrecta: 'Es un conjunto de ecuaciones donde las incógnitas aparecen en forma lineal. Numéricamente se resuelve con métodos como eliminación gaussiana, factorización LU o métodos iterativos como Jacobi y Gauss-Seidel.',
      calificacion: null
    },
    {
      id: 16,
      texto: '¿Qué es la eliminación gaussiana?',
      respuestaCorrecta: 'Es un método directo para resolver sistemas de ecuaciones lineales que transforma la matriz aumentada del sistema en una matriz triangular superior mediante operaciones elementales de fila, para luego aplicar sustitución hacia atrás.',
      calificacion: null
    },
    {
      id: 17,
      texto: '¿Qué es el número de condición de una matriz?',
      respuestaCorrecta: 'Es una medida que indica cuánto puede amplificarse el error en la solución de un sistema lineal debido a pequeños errores en los datos. Un número de condición alto indica una matriz mal condicionada.',
      calificacion: null
    },
    {
      id: 18,
      texto: '¿Qué es el método de Euler para ecuaciones diferenciales ordinarias?',
      respuestaCorrecta: 'Es el método numérico más simple para resolver EDOs. Usa la derivada en el punto actual para estimar el valor en el siguiente punto mediante la fórmula y_{n+1} = y_n + h·f(x_n, y_n), donde h es el tamaño del paso.',
      calificacion: null
    },
    {
      id: 19,
      texto: '¿Qué es el método de Runge-Kutta de orden 4?',
      respuestaCorrecta: 'Es un método numérico para resolver EDOs que calcula cuatro pendientes en cada paso y las promedia ponderadamente para obtener una aproximación muy precisa de la solución, siendo mucho más exacto que el método de Euler.',
      calificacion: null
    },
    {
      id: 20,
      texto: '¿Qué es la norma de un vector y para qué se usa en análisis numérico?',
      respuestaCorrecta: 'Es una función que asigna un valor positivo a cada vector y mide su "tamaño" o magnitud. En análisis numérico se usa para medir errores, evaluar la convergencia de métodos iterativos y analizar la estabilidad de algoritmos.',
      calificacion: null
    }
  ]
};