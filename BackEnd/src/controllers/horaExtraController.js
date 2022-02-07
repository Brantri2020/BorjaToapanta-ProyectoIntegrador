'use strict';

const firebase = require('../db');
const HoraExtra = require("../models/HoraExtra");
const firestore = firebase.firestore();

const obtenerHorasExtra = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    console.log(anho);
    try {
        const horasExtra = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes);
        const data = await horasExtra.get();
        const horasExtraArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron Horas Extra en la fecha indicada');
        } else {
            data.forEach(doc => {
                const horasExtra = new HoraExtra(
                    doc.id,
                    doc.data().cedulaEmpleado,
                    doc.data().nombreEmpleado,
                    doc.data().cantidadHoras,
                    doc.data().valorXHora,
                    doc.data().valorFinalHoras,
                    doc.data().fechaHoraExtra
                );
                horasExtraArray.push(horasExtra);
            });
            res.json(horasExtraArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const busquedaHoraExtra = async(req, res, next) => {

    try {
        const nombre = req.params.busqueda;
        const horasExtra = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes);
        const data = await horasExtra.get();
        const horaExtraArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron Horas Extra');
        } else {
            data.forEach(doc => {
                const horaExtra = new HoraExtra(
                    doc.id,
                    doc.data().cedulaEmpleado,
                    doc.data().nombreEmpleado,
                    doc.data().cantidadHoras,
                    doc.data().valorXHora,
                    doc.data().valorFinalHoras,
                    doc.data().fechaHoraExtra
                );

                if (doc.data().cedulaEmpleado == nombre ||
                    doc.data().nombreEmpleado == nombre ||
                    doc.data().cantidadHoras == nombre ||
                    doc.data().valorXHora == nombre ||
                    doc.data().valorFinalHoras == nombre ||
                    doc.data().fechaHoraExtra == nombre) {
                    horaExtraArray.push(horaExtra);
                }


            });

            res.json(horaExtraArray);

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarHoraExtra = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + '/' + mes).doc(doc.id).delete();
        res.json('Hora Extra eliminada correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const actualizarHoraExtra = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    try {
        const id = req.params.id;
        const data = req.body;
        const horaExtra = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes).doc(id);
        await horaExtra.update(data);
        res.json('Hora Extra actualizada correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearHoraExtra = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    try {
        const data = req.body;
        console.log(data);

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes).doc().set(data);

        res.json('Hora Extra guardada exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerHoraExtra = async(req, res, next) => {
    try {
        const id = req.params.id;
        const horaExtra = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes).doc(id);
        const data = await horaExtra.get();
        if (!data.exists) {
            res.status(404).send('Hora Extra no encontrada');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// ordenar
const obtenerHorasExtraOrdenadas = async(req, res, next) => {
    try {
        const filtro = req.params.filtro;
        const horaExtra = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes)
            .orderBy(filtro, "asc");
        const data = await horaExtra.get();
        const horasExtraArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron horas extra');
        } else {
            data.forEach(doc => {
                const horaExtra = new HoraExtra(
                    doc.id,
                    doc.data().cedulaEmpleado,
                    doc.data().nombreEmpleado,
                    doc.data().cantidadHoras,
                    doc.data().valorXHora,
                    doc.data().valorFinalHoras,
                    doc.data().fechaHoraExtra
                );
                horasExtraArray.push(horaExtra);
            });
            res.json(horasExtraArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    obtenerHorasExtra,
    busquedaHoraExtra,
    eliminarHoraExtra,
    actualizarHoraExtra,
    crearHoraExtra,
    obtenerHoraExtra,
    obtenerHorasExtraOrdenadas

}