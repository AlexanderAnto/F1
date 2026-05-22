// server.js (orden corregido)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());                // Habilita CORS para todas las rutas
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Rutas API
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/gradas', require('./routes/grada.routes'));
app.use('/api/lugares', require('./routes/lugar.routes'));
app.use('/api/gp', require('./routes/gp.routes'));
app.use('/api/asientos', require('./routes/asiento.routes'));
app.use('/api/boletos', require('./routes/boleto.routes'));
app.use('/api/tiposPago', require('./routes/tipoPago.routes'));
app.use('/api/historial', require('./routes/historial.routes'));

// Middleware de errores (opcional pero recomendado)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server alive' });
});
