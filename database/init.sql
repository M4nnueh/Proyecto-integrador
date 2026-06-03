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


