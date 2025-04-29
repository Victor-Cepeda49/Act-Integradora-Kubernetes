const express = require('express');
const alumnosRoutes = require('./routes/alumnos');

const app = express();

app.use(express.json());
//Conexion a rutas
app.use('/api/alumnos', alumnosRoutes);

const PORT = process.env.PORT || 3000;

//Ruta de prueba pantalla inicial
app.get('/', (req,res)=>{
    res.send('Prueba API')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; // para pruebas
