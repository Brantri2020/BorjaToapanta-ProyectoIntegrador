'use strict';

const firebase = require('../db');
const Empleado = require("../models/empleado");
const firestore = firebase.firestore();

const obtenerEmpleados = async(req, res, next) => {

    try {
        const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado');
        const data = await empleados.get();
        const empleadosArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron empleados');
        } else {
            data.forEach(doc => {
                const empleado = new Empleado(
                    doc.id,
                    doc.data().cedula,
                    doc.data().nombre,
                    doc.data().cargo,
                    doc.data().salario,
                    doc.data().numeroCuenta,
                    doc.data().tipoCuenta,
                    doc.data().institucionFinanciera
                );
                empleadosArray.push(empleado);
            });
            res.json(empleadosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    obtenerEmpleados
    //busquedaProveedor,
    //eliminarProveedor,
    //actualizarProveedor,
    //crearProveedor,
    //obtenerProveedor,
    //obtenerProveedoresOrdenados

}