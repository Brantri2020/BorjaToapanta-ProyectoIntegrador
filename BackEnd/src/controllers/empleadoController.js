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

const busquedaEmpleado = async(req, res, next) => {

    try {
        const nombre = req.params.busqueda;
        const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado');
        const data = await empleados.get();
        const empleadoArray = [];
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

                if (doc.data().cedula == nombre ||
                    doc.data().nombre == nombre ||
                    doc.data().cargo == nombre ||
                    doc.data().salario == nombre ||
                    doc.data().numeroCuenta == nombre ||
                    doc.data().tipoCuenta == nombre ||
                    doc.data().institucionFinanciera == nombre) {
                    empleadoArray.push(empleado);
                }


            });

            res.json(empleadoArray);

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarEmpleado = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').doc(id).delete();
        res.json('Empleado eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const actualizarEmpleado = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const empleado = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').doc(id);
        await empleado.update(data);
        res.json('Empleado actualizado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearEmpleado = async(req, res, next) => {
    try {
        const data = req.body;

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').doc().set(data);

        res.json('Empleado guardado exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerEmpleado = async(req, res, next) => {
    try {
        const id = req.params.id;
        const empleado = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').doc(id);
        const data = await empleado.get();
        if (!data.exists) {
            res.status(404).send('Empleado no encontrado');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// ordenar
const obtenerEmpleadosOrdenados = async(req, res, next) => {
    try {
        const filtro = req.params.filtro;
        const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado')
            .orderBy(filtro, "asc");
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
    obtenerEmpleados,
    busquedaEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    crearEmpleado,
    obtenerEmpleado,
    obtenerEmpleadosOrdenados

}