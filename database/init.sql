-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('estudiante', 'profesor', 'administrador')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba (si no existen ya)
INSERT INTO usuarios (nombre, email, password, rol)
VALUES
    ('Juan Estudiante', 'estudiante@numtech.com', 'estudiante123', 'estudiante'),
    ('Maria Profesora', 'profesor@numtech.com', 'profesor123', 'profesor'),
    ('Carlos Administrador', 'admin@numtech.com', 'admin123', 'administrador'),
    ('Ana Martinez', 'ana.martinez@numtech.com', 'estudiante123', 'estudiante'),
    ('Pedro Sanchez', 'pedro.sanchez@numtech.com', 'estudiante123', 'estudiante'),
    ('Lucia Gomez', 'lucia.gomez@numtech.com', 'estudiante123', 'estudiante'),
    ('Diego Fernandez', 'diego.fernandez@numtech.com', 'estudiante123', 'estudiante'),
    ('Sofía Herrera', 'sofia.herrera@numtech.com', 'estudiante123', 'estudiante')
ON CONFLICT (email) DO NOTHING;

-- Crear tabla de anuncios
CREATE TABLE IF NOT EXISTS anuncios (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar anuncios de prueba
INSERT INTO anuncios (titulo, contenido)
VALUES 
    ('¡Bienvenidos al nuevo semestre!', 'Estamos muy emocionados de darles la bienvenida a todos los estudiantes a este nuevo ciclo escolar. ¡Mucho éxito en sus proyectos!'),
    ('Mantenimiento del sistema', 'El próximo sábado a las 2:00 AM realizaremos labores de mantenimiento en la plataforma. Esperamos que el servicio se restablezca a las 4:00 AM.'),
    ('Nuevos cursos disponibles', 'Se han abierto las inscripciones para los nuevos cursos optativos de la facultad de ingeniería. Revisa la sección de cursos para más detalles.');

-- Crear tabla de Pruebas Generales
CREATE TABLE IF NOT EXISTS pruebas_generales (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Preguntas Teóricas vinculadas a la prueba
CREATE TABLE IF NOT EXISTS preguntas_teoricas (
    id SERIAL PRIMARY KEY,
    prueba_id INT NOT NULL,
    texto TEXT NOT NULL,
    respuesta_correcta TEXT NOT NULL,
    CONSTRAINT fk_prueba FOREIGN KEY(prueba_id) REFERENCES pruebas_generales(id) ON DELETE CASCADE
);

-- Datos de prueba para tus pruebas cURL
INSERT INTO pruebas_generales (id, titulo) VALUES (1, 'Conceptos Generales de Bases de Datos') ON CONFLICT DO NOTHING;
INSERT INTO preguntas_teoricas (prueba_id, texto, respuesta_correcta) VALUES 
(1, '¿Qué significa ACID en bases de datos relacionales?', 'Atomicidad, Consistencia, Aislamiento y Durabilidad.')
ON CONFLICT DO NOTHING;

-- Crear tabla de cursos
CREATE TABLE IF NOT EXISTS cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    url_ruta VARCHAR(255),
    descripcion TEXT,
    profesor VARCHAR(150)
);

-- Insertar cursos de ejemplo
INSERT INTO cursos (nombre, url_ruta, descripcion, profesor) VALUES
    ('Polinomio de Taylor', '/cursos/taylor', 'Aproximacion de funciones reales mediante polinomios.', 'Efrain Vasquez Millan'),
    ('Ecuaciones de 1 variable', '/cursos/ecuacion-1var', 'Metodos iterativos para resolver ecuaciones no lineales de una variable.', 'Diego Fernando Chicaiza Burbano'),
    ('Aproximacion de un polinomio', '/cursos/aproximacion', 'Interpolacion y aproximacion polinomial de conjuntos de datos.', 'Efrain Vasquez Millan')
ON CONFLICT DO NOTHING;

-- Crear tabla de relacion estudiantes-cursos
CREATE TABLE IF NOT EXISTS cursos_estudiantes (
    curso_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    PRIMARY KEY (curso_id, estudiante_id),
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    CONSTRAINT fk_estudiante FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inscribir todos los estudiantes en todos los cursos
INSERT INTO cursos_estudiantes (curso_id, estudiante_id)
SELECT c.id, u.id FROM cursos c, usuarios u WHERE u.rol = 'estudiante'
ON CONFLICT DO NOTHING;

-- Crear tabla de evaluaciones de análisis numérico
CREATE TABLE IF NOT EXISTS evaluaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de preguntas con opciones múltiples
CREATE TABLE IF NOT EXISTS preguntas_evaluacion (
    id SERIAL PRIMARY KEY,
    evaluacion_id INT NOT NULL,
    texto TEXT NOT NULL,
    opcion_a TEXT NOT NULL,
    opcion_b TEXT NOT NULL,
    opcion_c TEXT NOT NULL,
    opcion_d TEXT NOT NULL,
    respuesta_correcta CHAR(1) NOT NULL CHECK (respuesta_correcta IN ('a','b','c','d')),
    CONSTRAINT fk_evaluacion FOREIGN KEY(evaluacion_id) REFERENCES evaluaciones(id) ON DELETE CASCADE
);

-- Crear tabla de resultados por estudiante
CREATE TABLE IF NOT EXISTS resultados_evaluacion (
    id SERIAL PRIMARY KEY,
    evaluacion_id INT NOT NULL,
    estudiante_email VARCHAR(150) NOT NULL,
    respuestas JSONB NOT NULL,
    correctas INT NOT NULL,
    total INT NOT NULL,
    calificacion DECIMAL(4,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_eval FOREIGN KEY(evaluacion_id) REFERENCES evaluaciones(id) ON DELETE CASCADE
);

-- Insertar evaluación predeterminada
INSERT INTO evaluaciones (id, titulo) VALUES (1, 'Evaluación de Análisis Numérico') ON CONFLICT DO NOTHING;

-- Insertar las 20 preguntas
INSERT INTO preguntas_evaluacion (evaluacion_id, texto, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta) VALUES
(1, '¿Cuál es la condición necesaria para aplicar el método de bisección?', 'La función debe ser diferenciable en todo el intervalo', 'La función debe ser continua y tener cambio de signo en [a,b]', 'La función debe ser creciente en el intervalo', 'La función debe tener exactamente una raíz', 'b'),
(1, '¿Qué fórmula utiliza el método de Newton-Raphson?', 'x₁ = x₀ + f(x₀)/f''(x₀)', 'x₁ = x₀ · f''(x₀)/f(x₀)', 'x₁ = x₀ - f(x₀)/f''(x₀)', 'x₁ = (a + b) / 2', 'c'),
(1, '¿Para qué se utiliza el Polinomio de Taylor?', 'Para encontrar raíces de ecuaciones no lineales', 'Para resolver sistemas de ecuaciones lineales', 'Para aproximar funciones complejas mediante polinomios', 'Para calcular derivadas numéricas', 'c'),
(1, '¿Qué es el error de redondeo?', 'El error al truncar una serie infinita en un número finito de términos', 'El error por representar números con dígitos finitos en punto flotante', 'El error producido al dividir por cero', 'El error generado por una mala aproximación inicial', 'b'),
(1, '¿Cuál es la diferencia entre error absoluto y error relativo?', 'El error absoluto se expresa en porcentaje y el relativo no', 'El error relativo es la diferencia directa entre el valor real y el aproximado', 'El error absoluto es la diferencia directa y el relativo es el cociente entre el error absoluto y el valor real', 'Son lo mismo, solo cambia la unidad de medida', 'c'),
(1, '¿Qué significa que un método numérico converge?', 'Que siempre encuentra la solución exacta', 'Que las aproximaciones sucesivas se acercan cada vez más a la solución', 'Que el método termina en un número fijo de iteraciones', 'Que el error aumenta con cada iteración', 'b'),
(1, '¿Qué es el error de truncamiento?', 'El error por usar aritmética de punto flotante', 'El error por aproximar un proceso infinito con uno finito', 'El error por una mala elección del intervalo inicial', 'El error generado al invertir una matriz', 'b'),
(1, '¿En qué se diferencia el método de la secante del de Newton-Raphson?', 'La secante usa la segunda derivada en lugar de la primera', 'La secante no requiere calcular la derivada analíticamente', 'La secante siempre converge más rápido', 'La secante solo funciona para funciones lineales', 'b'),
(1, '¿Qué es la interpolación numérica?', 'Calcular la derivada de una función en un punto', 'Encontrar raíces de una función polinomial', 'Estimar valores desconocidos entre datos conocidos', 'Resolver integrales definidas numéricamente', 'c'),
(1, '¿Qué caracteriza a la interpolación de Lagrange?', 'Construye un polinomio que pasa exactamente por todos los puntos dados', 'Aproxima la función con líneas rectas entre puntos', 'Solo funciona con datos equiespaciados', 'Minimiza el error cuadrático medio', 'a'),
(1, '¿Cuándo se usa la integración numérica?', 'Cuando la función es un polinomio de grado bajo', 'Cuando no se puede obtener la antiderivada analíticamente', 'Cuando se necesita calcular derivadas de orden superior', 'Solo cuando la función es periódica', 'b'),
(1, '¿En qué consiste la regla del trapecio?', 'Aproxima el área bajo la curva usando rectángulos', 'Aproxima el área bajo la curva usando parábolas', 'Aproxima el área bajo la curva usando trapecios', 'Aproxima el área bajo la curva usando triángulos', 'c'),
(1, '¿Qué ventaja tiene la regla de Simpson sobre la del trapecio?', 'Es más fácil de implementar', 'Requiere menos puntos de evaluación', 'Logra mayor precisión usando parábolas en lugar de líneas rectas', 'Funciona para funciones discontinuas', 'c'),
(1, '¿Qué método se usa para resolver sistemas de ecuaciones lineales por eliminación?', 'Método de Euler', 'Eliminación gaussiana', 'Método de bisección', 'Interpolación de Newton', 'b'),
(1, '¿Qué indica un número de condición alto en una matriz?', 'Que la matriz es fácil de invertir', 'Que el sistema tiene solución única', 'Que pequeños errores en los datos se amplifican en la solución', 'Que la matriz es ortogonal', 'c'),
(1, '¿Qué hace el método de Euler para resolver EDOs?', 'Calcula la solución exacta usando la antiderivada', 'Usa la derivada en el punto actual para estimar el siguiente valor', 'Divide el intervalo a la mitad en cada iteración', 'Resuelve el sistema usando matrices', 'b'),
(1, '¿Por qué el método de Runge-Kutta de orden 4 es mejor que el de Euler?', 'Porque es más fácil de programar', 'Porque calcula cuatro pendientes por paso y las promedia para mayor precisión', 'Porque siempre converge en menos iteraciones', 'Porque no necesita condiciones iniciales', 'b'),
(1, '¿Para qué se usa la norma de un vector en análisis numérico?', 'Para calcular el determinante de una matriz', 'Para medir errores y evaluar convergencia de métodos iterativos', 'Para encontrar los valores propios de una matriz', 'Para resolver integrales dobles', 'b'),
(1, '¿Qué es la factorización LU?', 'Una técnica para encontrar raíces de polinomios', 'Una descomposición de una matriz en dos matrices triangulares para resolver sistemas lineales', 'Un método para calcular integrales numéricas', 'Un algoritmo para ordenar vectores', 'b'),
(1, '¿Qué es el método de Gauss-Seidel?', 'Un método directo para resolver sistemas lineales', 'Un método para encontrar valores propios', 'Un método iterativo para resolver sistemas de ecuaciones lineales', 'Un método de integración numérica', 'c')
ON CONFLICT DO NOTHING;