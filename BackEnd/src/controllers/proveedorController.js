'use strict';

const firebase = require('../db');
const Proveedor = require("../models/proveedor");
const firestore = firebase.firestore();





const obtenerProveedores = async(req, res, next) => {

    try {
        const proveedores = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor');
        const data = await proveedores.get();
        const proveedoresArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron proveedores');
        } else {
            data.forEach(doc => {
                const proveedor = new Proveedor(
                    doc.id,
                    doc.data().ruc,
                    doc.data().nombre,
                    doc.data().cuenta,
                    doc.data().banco,
                    doc.data().tipoCuenta,
                    doc.data().telefonoCelular,
                    doc.data().telefonoConvencional,
                    doc.data().correo
                );
                proveedoresArray.push(proveedor);
            });
            res.json(proveedoresArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const busquedaProveedor = async(req, res, next) => {
    try {

        const nombre = req.params.busqueda;

        const proveedor = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor').doc("nombre", nombre);
        const data = await proveedor.get();
        if (!data.exists) {

            res.status(404).send('Proveedor no existente');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarProveedor = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor').doc(id).delete();
        res.json('Proveedor eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

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

        //const ruc = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Proveedor').doc(ruc);

        //if (ruc) return res.status(401).send("El proveedor con este RUC ya esta registrado.");

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

module.exports = {
    obtenerProveedores,
    busquedaProveedor,
    eliminarProveedor,
    actualizarProveedor,
    crearProveedor,
    obtenerProveedor

}

/*
exports.busquedaUsuario = async (req, res) => {

    try {

        let palabra;

        //Creamos nuestra busqueda
        palabra = req.params.busqueda;

        const usuarios1 = await Usuario.find({ nombre: palabra }).sort('nombre');

        if (JSON.stringify(usuarios1)!=='[]' ) {
            res.json(usuarios1);
            

        } else {
            const usuarios2 = await Usuario.find({ apellido: palabra }).sort('apellido');

            if (JSON.stringify(usuarios2)!=='[]' ) {
                res.json(usuarios2);
            } else {
                const usuarios3 = await Usuario.find({ cedula: palabra }).sort('cedula');

                if (JSON.stringify(usuarios3)!=='[]' ) {
                    res.json(usuarios3);
                } else {
                    const usuarios4 = await Usuario.find({ direccion: palabra }).sort('direccion');

                    if (JSON.stringify(usuarios4)!=='[]' ) {
                        res.json(usuarios4);
                    } else {
                        const usuarios5 = await Usuario.find({ nombreUsuario: palabra }).sort('nombreUsuario');

                        if (JSON.stringify(usuarios5)!=='[]' ) {
                            res.json(usuarios5);
                        } else {
                            const usuarios6 = await Usuario.find({ rol: palabra }).sort('rol');

                            if (JSON.stringify(usuarios6)!=='[]' ) {
                                res.json(usuarios6);
                            } else {
                                return res.json({ msg: 'No existen coincidencias' });
                            }
                        }
                    }
                }
            }


           
        }




    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}*/