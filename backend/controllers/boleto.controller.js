const conexion = require('../config/db');

const obtenerBoletos = async (req, res) => {

    try {

        const [rows] = await conexion.query(`
            SELECT
                b.id_boleto,
                gp.nombre_gp,
                a.fila,
                a.numero_asiento
            FROM boleto b
            INNER JOIN gran_premio gp
            ON b.id_gp = gp.id_gp
            INNER JOIN asiento a
            ON b.id_asiento = a.id_asiento
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};

const crearBoleto = async (req, res) => {

    try {

        const {
            id_gp,
            id_asiento
        } = req.body;

        const [result] = await conexion.query(`
            INSERT INTO boleto(
                id_gp,
                id_asiento
            )
            VALUES(?,?)
        `,
        [id_gp, id_asiento]);

        res.json({
            mensaje: 'Boleto creado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};

module.exports = {
    obtenerBoletos,
    crearBoleto
};