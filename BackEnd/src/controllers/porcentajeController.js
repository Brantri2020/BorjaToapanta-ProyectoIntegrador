'use strict';

const firebase = require('../db');
const Porcentaje = require("../models/porcentaje");
const firestore = firebase.firestore();







const obtenerPorcentajes = async (req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;
    try {
        const porcentajes = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/' + anho + "/" + mes);
        const data = await porcentajes.get();
        const porcentajesArray = [];
        if (data.empty) {
            res.json("");
        } else {
            data.forEach(doc => {
                const porcentaje = new Porcentaje(
                    doc.id,
                    doc.data().tipoPorcentaje,
                    doc.data().porcentaje
                );
                porcentajesArray.push(porcentaje);
            });
            res.json(porcentajesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const busquedaPorcentaje = async (req, res, next) => {

    try {
        const mes = req.params.mes;
        const anho = req.params.anho;
        const nombre = req.params.busqueda;

        const porcentajes = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/' + anho + '/' + mes);
        const data = await porcentajes.get();
        const porcentajesArray = [];
        if (data.empty) {
            res.json("");
        } else {
            data.forEach(doc => {
                const procentaje = new Porcentaje(
                    doc.id,
                    doc.data().tipoPorcentaje,
                    doc.data().porcentaje,
                );

                if (doc.data().tipoPorcentaje == nombre ||
                    doc.data().porcentaje == nombre) {
                    porcentajesArray.push(procentaje);
                }
            });
            res.json(porcentajesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarPorcentaje = async(req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/'+anho+'/'+mes).doc(id).delete();
        res.json('Proveedor eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// ordenar
const obtenerPorcentajesOrdenados = async(req, res, next) => {
    
    try {
        const filtro = req.params.filtro;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const porcentajes = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/'+anho+'/'+mes)
            .orderBy(filtro, "asc");
        const data = await porcentajes.get();
        const porcentajesArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron porcentajes');
        } else {
            data.forEach(doc => {
                const porcentaje = new Porcentaje(
                    doc.id,
                    doc.data().tipoPorcentaje,
                    doc.data().porcentaje,                    
                );
                
                porcentajesArray.push(porcentaje);
            });
            res.json(porcentajesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const crearPorcentaje = async(req, res, next) => {
    try {
        const data = req.body;
        const anho = req.params.anho;
        const mes = req.params.mes;

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/'+anho+'/'+mes).doc().set(data);

        res.json('Porcentaje guardado exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const actualizarPorcentaje = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const porcentaje = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/'+anho+'/'+mes).doc(id);
        await porcentaje.update(data);
        res.json('Porcentaje actualizado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerPorcentaje = async(req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const porcentaje = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Porcentaje/'+anho+'/'+mes).doc(id);
        const data = await porcentaje.get();
        if (!data.exists) {
            res.status(404).send('Porcentaje no encontrado');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    obtenerPorcentajes,
    busquedaPorcentaje,
    eliminarPorcentaje,
    obtenerPorcentajesOrdenados,
    crearPorcentaje,
    actualizarPorcentaje,
    obtenerPorcentaje
    //busquedaProveedor,
    //eliminarProveedor,
    //actualizarProveedor,
    //crearProveedor,
    //obtenerProveedor,
    //obtenerProveedoresOrdenados

}