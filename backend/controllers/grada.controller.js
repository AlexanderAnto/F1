const conexion = require('../config/db');

const obtenerGradas = async (req, res) => {

    try {

        const [rows] = await conexion.query(
            'SELECT * FROM grada'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};

const crearGrada = async (req, res) => {

    try {

        const {
            nombre_grada,
            color,
            precio
        } = req.body;

        const [result] = await conexion.query(`
            INSERT INTO grada(
                nombre_grada,
                color,
                precio
            )
            VALUES(?,?,?)
        `,
        [nombre_grada, color, precio]);

        res.json({
            mensaje: 'Grada creada',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};

const gradaModel =
    require('../models/grada.model');
    
const obtenerColores = async (
    req,
    res
) => {

    try {

        const resultado =
            await gradaModel.obtenerColores();

        const enumString =
            resultado[0].Type;

        const colores =
            enumString
            .replace('enum(', '')
            .replace(')', '')
            .replaceAll("'", '')
            .split(',');

        res.json(colores);

    } catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error servidor',
        error: error.message
    });
}
};
module.exports = {
    obtenerGradas,
    crearGrada,
    obtenerColores
};