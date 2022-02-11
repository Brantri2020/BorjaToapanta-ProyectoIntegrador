'use strict';

const firebase = require('../db');
const Anticipo = require("../models/Anticipo");
const firestore = firebase.firestore();

const obtenerAnticipos = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    console.log(anho);
    try {
        const anticipos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes);
        const data = await anticipos.get();
        const anticiposArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron Anticipos');
        } else {
            data.forEach(doc => {
                const anticipo = new Anticipo(
                    doc.id,
                    doc.data().cedulaEmpleado,
                    doc.data().nombreEmpleado,
                    doc.data().valorAnticipo,
                    doc.data().fechaAnticipo
                );
                anticiposArray.push(anticipo);
            });
            res.json(anticiposArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const busquedaAnticipo = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;


    try {
        const nombre = req.params.busqueda;
        const anticipos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes);
        const data = await anticipos.get();
        const anticipoArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron anticipos');
        } else {
            data.forEach(doc => {
                const anticipo = new Anticipo(
                    doc.id,
                    doc.data().cedulaEmpleado,
                    doc.data().nombreEmpleado,
                    doc.data().valorAnticipo,
                    doc.data().fechaAnticipo
                );

                if (doc.data().cedulaEmpleado == nombre ||
                    doc.data().nombreEmpleado == nombre ||
                    doc.data().valorAnticipo == nombre ||
                    doc.data().fechaAnticipo == nombre) {
                    anticipoArray.push(anticipo);
                }


            });

            res.json(anticipoArray);

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarAnticipo = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;
    try {
        const id = req.params.id;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + '/' + mes).doc(id).delete();
        res.json('Anticipo eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const actualizarAnticipo = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    try {
        const id = req.params.id;
        const data = req.body;
        const anticipo = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes).doc(id);
        await anticipo.update(data);
        res.json('Anticipo actualizado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearAnticipo = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    try {
        const data = req.body;
        console.log(data);

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes).doc().set(data);

        res.json('Anticipo guardado exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerAnticipo = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;

    try {
        const id = req.params.id;
        const anticipo = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes).doc(id);
        const data = await anticipo.get();
        if (!data.exists) {
            res.status(404).send('Anticipo no encontrado');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// ordenar
const obtenerAnticiposOrdenados = async(req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;
    try {
        const filtro = req.params.filtro;
        const anticipos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes)
            .orderBy(filtro, "asc");
        const data = await anticipos.get();
        const anticiposArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron anticipos');
        } else {
            data.forEach(doc => {
                const anticipo = new Anticipo(
                    doc.id,
                    doc.data().cedulaEmpleado,
                    doc.data().nombreEmpleado,
                    doc.data().valorAnticipo,
                    doc.data().fechaAnticipo
                );
                anticiposArray.push(anticipo);
            });
            res.json(anticiposArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    obtenerAnticipos,
    busquedaAnticipo,
    eliminarAnticipo,
    actualizarAnticipo,
    crearAnticipo,
    obtenerAnticipo,
    obtenerAnticiposOrdenados

}