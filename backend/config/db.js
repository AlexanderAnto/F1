const mysql =
    require('mysql2/promise');

require('dotenv').config();

const conexion =
    mysql.createPool({

        host:
            process.env.DB_HOST,

        user:
            process.env.DB_USER,

        password:
            process.env.DB_PASSWORD,

        database:
            process.env.DB_NAME,

        waitForConnections: true,

        connectionLimit: 10,

        queueLimit: 0
    });
(async () => {
    try {
        const conn = await conexion.getConnection();
        console.log('✅ Base de datos conectada');
        conn.release();
    } catch (err) {
        console.error('❌ Error conectando a la BD:', err.message);
        // No detengas el proceso, solo registra
    }
})();
module.exports = conexion;