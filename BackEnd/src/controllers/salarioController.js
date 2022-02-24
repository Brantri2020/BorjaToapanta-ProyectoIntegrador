'use strict';

const firebase = require('../db');
const Salario = require("../models/salario");
const firestore = firebase.firestore();

const obtenerSalarios = async(req, res, next) => {

    try {
        const salarios = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario');
        const data = await salarios.get();
        const salariosArray = [];
        if (data.empty) {
            res.json('');
        } else {
            data.forEach(doc => {
                const salario = new Salario(
                    doc.id,
                    doc.data().cargo,
                    doc.data().salario
                );
                salariosArray.push(salario);
            });
            res.json(salariosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const busquedaSalario = async(req, res, next) => {

    try {
        const cargo = req.params.busqueda;
        const salarios = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario');
        const data = await salarios.get();
        const salarioArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron Salarios');
        } else {
            data.forEach(doc => {
                const salario = new Salario(
                    doc.id,
                    doc.data().cargo,
                    doc.data().salario
                );

                if (doc.data().cargo == cargo ||
                    doc.data().salario == cargo) {
                    salarioArray.push(salario);
                }


            });

            res.json(salarioArray);

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarSalario = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario').doc(id).delete();
        res.json('Salario eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const actualizarSalario = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const salario = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario').doc(id);
        await salario.update(data);
        res.json('Salario actualizado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearSalario = async(req, res, next) => {
    try {
        const data = req.body;

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario').doc().set(data);

        res.json('Salario guardado exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerSalario = async(req, res, next) => {
    try {
        const id = req.params.id;
        const salario = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario').doc(id);
        const data = await salario.get();
        if (!data.exists) {
            res.status(404).send('Salario no encontrado');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// ordenar
const obtenerSalariosOrdenados = async(req, res, next) => {
    try {
        const filtro = req.params.filtro;
        const salarios = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Salario')
            .orderBy(filtro, "asc");
        const data = await salarios.get();
        const salariosArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron salarios');
        } else {
            data.forEach(doc => {
                const salario = new Salario(
                    doc.id,
                    doc.data().cargo,
                    doc.data().salario
                );
                salariosArray.push(salario);
            });
            res.json(salariosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    obtenerSalarios,
    busquedaSalario,
    eliminarSalario,
    actualizarSalario,
    crearSalario,
    obtenerSalario,
    obtenerSalariosOrdenados

}