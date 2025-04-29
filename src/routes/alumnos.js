const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear un alumno
router.post('/', async (req, res) => {
  const { nombre, matricula, niv_curso } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO alumnos (nombre, matricula, niv_curso) VALUES (?, ?, ?)', [nombre, matricula, niv_curso]);
    res.status(201).json({ id: result.insertId, nombre, matricula, niv_curso });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM alumnos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener alumno por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM alumnos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar alumno
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, matricula, niv_curso } = req.body;
  try {
    const [result] = await db.execute('UPDATE alumnos SET nombre = ?, matricula = ?, niv_curso = ? WHERE id = ?', [nombre, matricula, niv_curso, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ message: 'Alumno actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar alumno
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM alumnos WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ message: 'Alumno eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
