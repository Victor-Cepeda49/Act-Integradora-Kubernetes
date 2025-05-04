const express = require('express');
const alumnosRoutes = require('./routes/alumnos');
const pool = require('./db');

const app = express();

app.use(express.json());
//Conexion a rutas
app.use('/api/alumnos', alumnosRoutes);

//Ruta de prueba pantalla inicial
app.get('/', (req,res)=>{
    res.send('Prueba API')
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = { app, server}; // para pruebas
