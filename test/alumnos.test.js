const request = require('supertest');
const { app, server} = require('../src/index');
const { closePool } = require('../src/db');

describe('CRUD Alumnos API', () => {
  let createdAlumnoId;

  it('debería crear un nuevo alumno', async () => {
    const res = await request(app)
      .post('/api/alumnos')
      .send({ nombre: 'Orlando Hernandez', matricula: 3054897, niv_curso: 'Profesional' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdAlumnoId = res.body.id;
  });

  it('debería obtener todos los alumnos', async () => {
    const res = await request(app).get('/api/alumnos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('debería obtener un alumno por ID', async () => {
    const res = await request(app).get(`/api/alumnos/${createdAlumnoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nombre');
  });

  it('debería actualizar un alumno', async () => {
    const res = await request(app)
      .put(`/api/alumnos/${createdAlumnoId}`)
      .send({ nombre: 'Javier Rivera', matricula: 3048791, niv_curso: 'Profesional' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Alumno actualizado');
  });

  it('debería eliminar un alumno', async () => {
    const res = await request(app).delete(`/api/alumnos/${createdAlumnoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Alumno eliminado');
  });
  
  afterAll(async () => {
    await closePool();       // Cerramos la conexión a la DB
    server.close();          // Cerramos el servidor Express
  });
});
