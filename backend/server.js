require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://alexanderanto.github.io'
}));

app.use(express.json());


// ==========================
// RUTAS
// ==========================

app.use(
    '/api/usuarios',
    require('./routes/usuario.routes')
);

app.use(
    '/api/gradas',
    require('./routes/grada.routes')
);

app.use(
    '/api/lugares',
    require('./routes/lugar.routes')
);

app.use(
    '/api/gp',
    require('./routes/gp.routes')
);

app.use(
    '/api/asientos',
    require('./routes/asiento.routes')
);

app.use(
    '/api/boletos',
    require('./routes/boleto.routes')
);

app.use(
    '/api/tiposPago',
    require('./routes/tipoPago.routes')
);

app.use(
    '/api/historial',
    require('./routes/historial.routes')
);


// ==========================
// HEALTH CHECK
// ==========================

app.get('/api/health', (req, res) => {

    res.json({
        status: 'ok'
    });

});


// ==========================
// MIDDLEWARE ERRORES
// ==========================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        mensaje:
            'Error interno servidor',

        error:
            err.message
    });

});


// ==========================
// SERVIDOR
// ==========================

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor corriendo en puerto ${PORT}`
    );

});