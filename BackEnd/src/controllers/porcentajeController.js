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


/*



const actualizarProveedor = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const proveedor = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor').doc(id);
        await proveedor.update(data);
        res.json('Proveedor actualizado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearProveedor = async(req, res, next) => {
    try {
        const data = req.body;

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor').doc().set(data);

        res.json('Proveedor guardado exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerProveedor = async(req, res, next) => {
    try {
        const id = req.params.id;
        const proveedor = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor').doc(id);
        const data = await proveedor.get();
        if (!data.exists) {
            res.status(404).send('Proveedor no encontrado');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


*/
module.exports = {
    obtenerPorcentajes,
    busquedaPorcentaje,
    eliminarPorcentaje,
    obtenerPorcentajesOrdenados
    //busquedaProveedor,
    //eliminarProveedor,
    //actualizarProveedor,
    //crearProveedor,
    //obtenerProveedor,
    //obtenerProveedoresOrdenados

}