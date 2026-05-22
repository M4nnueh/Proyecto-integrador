const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS para permitir peticiones desde el frontend (Angular en localhost:4200)
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 5000, // 5 segundos max para intentar conectar
  idleTimeoutMillis: 30000,      // 30 segundos max antes de cerrar un cliente inactivo
});

// Probar conexión a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos PostgreSQL:', err.stack);
  }
  console.log('Conexión exitosa a la base de datos PostgreSQL');
  release();
});

// Endpoint de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email y contraseña son obligatorios.' 
    });
  }

  try {
    // Buscar el usuario por email
    const query = 'SELECT id, nombre, email, password, rol FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'El correo electrónico no está registrado.' 
      });
    }

    const usuario = result.rows[0];

    // Verificar contraseña en texto plano (como está configurado en el init.sql de prueba)
    if (usuario.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Contraseña incorrecta.' 
      });
    }

    // Login exitoso
    return res.json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en /api/login:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ocurrió un error en el servidor.' 
    });
  }
});

// Endpoint de registro de nuevos usuarios
app.post('/api/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre, email y contraseña son obligatorios.' 
    });
  }

  // Solo permitir registro como estudiante o profesor (no admin)
  const rolFinal = (rol === 'profesor') ? 'profesor' : 'estudiante';

  try {
    // Verificar si el email ya existe
    const existe = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (existe.rows.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Ya existe una cuenta con ese correo electrónico.' 
      });
    }

    // Insertar nuevo usuario
    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol';
    const result = await pool.query(query, [nombre, email, password, rolFinal]);

    const nuevoUsuario = result.rows[0];

    return res.status(201).json({
      success: true,
      message: 'Cuenta creada exitosamente.',
      user: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });

  } catch (error) {
    console.error('Error en /api/register:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ocurrió un error al crear la cuenta.' 
    });
  }
});

// Endpoint para obtener los cursos en los que está inscrito un estudiante
app.get('/api/estudiantes/:id/cursos', async (req, res) => {
  const estudianteId = req.params.id;

  try {
    const query = `
      SELECT c.id, c.nombre, c.url_ruta, c.descripcion
      FROM cursos c
      JOIN cursos_estudiantes ce ON c.id = ce.curso_id
      WHERE ce.estudiante_id = $1
      ORDER BY c.id ASC
    `;
    const result = await pool.query(query, [estudianteId]);

    return res.json({
      success: true,
      cursos: result.rows
    });
  } catch (error) {
    console.error('Error en /api/estudiantes/:id/cursos:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ocurrió un error al obtener los cursos.' 
    });
  }
});

// Endpoint de estadísticas del dashboard admin
app.get('/api/admin/stats', async (req, res) => {
  try {
    // Ejecutar múltiples consultas en paralelo
    const [
      totalUsuariosRes,
      totalRolesRes,
      ultimosUsuariosRes
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) as total FROM usuarios'),
      pool.query('SELECT rol, COUNT(*) as count FROM usuarios GROUP BY rol'),
      pool.query('SELECT id, nombre, email, rol, fecha_creacion FROM usuarios ORDER BY fecha_creacion DESC LIMIT 5')
    ]);

    const totalUsuarios = parseInt(totalUsuariosRes.rows[0].total, 10);
    
    // Procesar los roles
    let totalEstudiantes = 0;
    let totalProfesores = 0;
    let totalAdmins = 0;
    
    totalRolesRes.rows.forEach(row => {
      const count = parseInt(row.count, 10);
      if (row.rol === 'estudiante') totalEstudiantes = count;
      else if (row.rol === 'profesor') totalProfesores = count;
      else if (row.rol === 'administrador') totalAdmins = count;
    });

    return res.json({
      success: true,
      stats: {
        totalUsuarios,
        totalEstudiantes,
        totalProfesores,
        totalAdmins,
        ultimosUsuarios: ultimosUsuariosRes.rows
      }
    });

  } catch (error) {
    console.error('Error en /api/admin/stats:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ocurrió un error al obtener las estadísticas.' 
    });
  }
});

// Endpoint para obtener todos los anuncios
app.get('/api/anuncios', async (req, res) => {
  try {
    const query = 'SELECT id, titulo, contenido, fecha_creacion FROM anuncios ORDER BY fecha_creacion DESC';
    const result = await pool.query(query);

    return res.json({
      success: true,
      anuncios: result.rows
    });
  } catch (error) {
    console.error('Error en /api/anuncios (GET):', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ocurrió un error al obtener los anuncios.' 
    });
  }
});

// Endpoint para crear un nuevo anuncio
app.post('/api/anuncios', async (req, res) => {
  const { titulo, contenido } = req.body;

  if (!titulo || !contenido) {
    return res.status(400).json({ 
      success: false, 
      message: 'El título y el contenido son obligatorios.' 
    });
  }

  try {
    const query = 'INSERT INTO anuncios (titulo, contenido) VALUES ($1, $2) RETURNING id, titulo, contenido, fecha_creacion';
    const result = await pool.query(query, [titulo, contenido]);

    return res.status(201).json({
      success: true,
      message: 'Anuncio creado exitosamente.',
      anuncio: result.rows[0]
    });
  } catch (error) {
    console.error('Error en /api/anuncios (POST):', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ocurrió un error al crear el anuncio.' 
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
