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