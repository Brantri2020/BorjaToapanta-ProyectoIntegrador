'use strict';

const firebase = require('../db');
const Evento = require("../models/evento");
const Calendario = require("../models/calendario");
const firestore = firebase.firestore();







const obtenerEventos = async (req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;
    try {
        const eventos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + "/" + mes);
        const data = await eventos.get();
        const eventosArray = [];
        if (data.empty) {
            res.json("");
        } else {
            data.forEach(doc => {
                const evento = new Evento(
                    doc.id,
                    doc.data().nombreEvento,
                    doc.data().tipoEvento,
                    doc.data().fecha,
                    doc.data().horaInicio,
                    doc.data().horaFin,
                    doc.data().descripcion
                );
                eventosArray.push(evento);
            });
            res.json(eventosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const busquedaEvento = async (req, res, next) => {

    try {
        const mes = req.params.mes;
        const anho = req.params.anho;
        const nombre = req.params.busqueda;

        const eventos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + '/' + mes);
        const data = await eventos.get();
        const eventosArray = [];
        if (data.empty) {
            res.json("");
        } else {
            data.forEach(doc => {
                const evento = new Evento(
                    doc.id,
                    doc.data().nombreEvento,
                    doc.data().tipoEvento,
                    doc.data().fecha,
                    doc.data().horaInicio,
                    doc.data().horaFin,
                    doc.data().descripcion
                );

                if (doc.data().nombreEvento == nombre ||
                    doc.data().tipoEvento == nombre ||
                    doc.data().fecha == nombre ||
                    doc.data().horaInicio == nombre ||
                    doc.data().horaFin == nombre ||
                    doc.data().descripcion == nombre) {
                    eventosArray.push(evento);
                }
            });
            res.json(eventosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// ordenar
const obtenerEventosOrdenados = async (req, res, next) => {

    try {
        const filtro = req.params.filtro;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const eventos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + '/' + mes)
            .orderBy(filtro, "asc");
        const data = await eventos.get();
        const eventosArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron eventos');
        } else {
            data.forEach(doc => {
                const evento = new Evento(
                    doc.id,
                    doc.data().nombreEvento,
                    doc.data().tipoEvento,
                    doc.data().fecha,
                    doc.data().horaInicio,
                    doc.data().horaFin,
                    doc.data().descripcion
                );

                eventosArray.push(evento);
            });
            res.json(eventosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarEvento = async (req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + '/' + mes).doc(id).delete();
        res.json('Evento eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearEvento = async (req, res, next) => {
    try {
        const data = req.body;
        const anho = req.params.anho;
        const mes = req.params.mes;
        var mensaje = "";

        const eventos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + "/" + mes);
        const data2 = await eventos.get();

        let contador = 0;
        let contador2 = 0;


        if (data2.empty) {

        } else {

            //////////////Array tiempo entrada
            contador2++;
            let arrayTiempo2 = [];
            let horaActual2 = parseInt(data.horaInicio.split(":")[0]);
            let numeroHoras2 = parseInt(data.horaFin.split(":")[0]) - parseInt(data.horaInicio.split(":")[0]);



            if (parseInt(data.horaInicio.split(":")[1]) >= parseInt(data.horaFin.split(":")[1]) || numeroHoras2 > 0) {
                for (let k = parseInt(data.horaInicio.split(":")[1]); k <= 59; k++) {
                    if (k < 10) {
                        arrayTiempo2.push(horaActual2.toString() + ":0" + k.toString());
                    } else {
                        arrayTiempo2.push(horaActual2.toString() + ":" + k.toString());
                    }

                }
                horaActual2++;
                numeroHoras2--;
                while (numeroHoras2 > 0) {

                    for (let l = 0; l <= 59; l++) {

                        if (l < 10) {
                            arrayTiempo2.push(horaActual2.toString() + ":" + "0" + l.toString());
                        } else {
                            arrayTiempo2.push(horaActual2.toString() + ":" + l.toString());
                        }
                    }
                    horaActual2++;
                    numeroHoras2--;
                }
                for (let k = 0; k <= parseInt(data.horaFin.split(":")[1]); k++) {
                    if (k < 10) {
                        arrayTiempo2.push(horaActual2.toString() + ":" + "0" + k.toString());
                    } else {
                        arrayTiempo2.push(horaActual2.toString() + ":" + k.toString());
                    }
                }
            } else {


                for (let k = parseInt(data.horaInicio.split(":")[1]); k <= parseInt(data.horaFin.split(":")[1]); k++) {
                    if (k < 10) {
                        arrayTiempo2.push(horaActual2.toString() + ":0" + k.toString());
                    } else {
                        arrayTiempo2.push(horaActual2.toString() + ":" + k.toString());
                    }

                }

            }

            data2.forEach(doc => {
                contador++;
                let arrayTiempo = [];
                let horaActual = parseInt(doc.data().horaInicio.split(":")[0]);

                if (data.fecha === doc.data().fecha) {
                    let numeroHoras = parseInt(doc.data().horaFin.split(":")[0]) - parseInt(doc.data().horaInicio.split(":")[0]);

                    //for (let i = parseInt(doc.data().horaInicio.split(":")[0]); i <= parseInt(doc.data().horaFin.split(":")[0]); i++) {
                    if (parseInt(doc.data().horaInicio.split(":")[1]) >= parseInt(doc.data().horaFin.split(":")[1]) || numeroHoras > 0) {
                        for (let k = parseInt(doc.data().horaInicio.split(":")[1]); k <= 59; k++) {
                            if (k < 10) {
                                arrayTiempo.push(horaActual.toString() + ":0" + k.toString());
                            } else {
                                arrayTiempo.push(horaActual.toString() + ":" + k.toString());
                            }

                        }
                        horaActual++;
                        numeroHoras--;
                        while (numeroHoras > 0) {

                            for (let l = 0; l <= 59; l++) {

                                if (l < 10) {
                                    arrayTiempo.push(horaActual.toString() + ":" + "0" + l.toString());
                                } else {
                                    arrayTiempo.push(horaActual.toString() + ":" + l.toString());
                                }
                            }
                            horaActual++;
                            numeroHoras--;
                        }
                        for (let k = 0; k <= parseInt(doc.data().horaFin.split(":")[1]); k++) {
                            if (k < 10) {
                                arrayTiempo.push(horaActual.toString() + ":" + "0" + k.toString());
                            } else {
                                arrayTiempo.push(horaActual.toString() + ":" + k.toString());
                            }
                        }
                    } else {


                        for (let k = parseInt(doc.data().horaInicio.split(":")[1]); k <= parseInt(doc.data().horaFin.split(":")[1]); k++) {
                            if (k < 10) {
                                arrayTiempo.push(horaActual.toString() + ":0" + k.toString());
                            } else {
                                arrayTiempo.push(horaActual.toString() + ":" + k.toString());
                            }

                        }

                    }


                    ////comparacion

                    if (mensaje !== "Cruce de horarios") {
                        for (let i = 0; i < arrayTiempo.length; i++) {
                            for (let j = 0; j < arrayTiempo2.length && mensaje !== "Cruce de horarios"; j++) {
                                if (arrayTiempo[i] === arrayTiempo2[j]) {

                                    mensaje = "Cruce de horarios";
                                }
                            }
                        }
                    }
                }
            });
        }


        if (mensaje !== "Cruce de horarios") {

            await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + '/' + mes).doc().set(data);

        }
        res.json(mensaje);



    } catch (error) {
        res.status(400).send(error.message);
    }
}


const actualizarEvento = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const anho = req.params.anho;
        const mes = req.params.mes;

        var mensaje = "";

        const eventos = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + "/" + mes);
        const data2 = await eventos.get();

        let contador = 0;
        let contador2 = 0;


        if (data2.empty) {

        } else {

            //////////////Array tiempo entrada
            contador2++;
            let arrayTiempo2 = [];
            let horaActual2 = parseInt(data.horaInicio.split(":")[0]);
            let numeroHoras2 = parseInt(data.horaFin.split(":")[0]) - parseInt(data.horaInicio.split(":")[0]);
            let horaInicial = data.horaInicio;


            if (parseInt(data.horaInicio.split(":")[1]) >= parseInt(data.horaFin.split(":")[1]) || numeroHoras2 > 0) {
                for (let k = parseInt(data.horaInicio.split(":")[1]); k <= 59; k++) {
                    if (k < 10) {
                        arrayTiempo2.push(horaActual2.toString() + ":0" + k.toString());
                    } else {
                        arrayTiempo2.push(horaActual2.toString() + ":" + k.toString());
                    }

                }
                horaActual2++;
                numeroHoras2--;
                while (numeroHoras2 > 0) {

                    for (let l = 0; l <= 59; l++) {

                        if (l < 10) {
                            arrayTiempo2.push(horaActual2.toString() + ":" + "0" + l.toString());
                        } else {
                            arrayTiempo2.push(horaActual2.toString() + ":" + l.toString());
                        }
                    }
                    horaActual2++;
                    numeroHoras2--;
                }
                for (let k = 0; k <= parseInt(data.horaFin.split(":")[1]); k++) {
                    if (k < 10) {
                        arrayTiempo2.push(horaActual2.toString() + ":" + "0" + k.toString());
                    } else {
                        arrayTiempo2.push(horaActual2.toString() + ":" + k.toString());
                    }
                }
            } else {


                for (let k = parseInt(data.horaInicio.split(":")[1]); k <= parseInt(data.horaFin.split(":")[1]); k++) {
                    if (k < 10) {
                        arrayTiempo2.push(horaActual2.toString() + ":0" + k.toString());
                    } else {
                        arrayTiempo2.push(horaActual2.toString() + ":" + k.toString());
                    }

                }

            }

            data2.forEach(doc => {
                contador++;
                let arrayTiempo = [];
                let horaActual = parseInt(doc.data().horaInicio.split(":")[0]);

                if (data.fecha === doc.data().fecha) {
                    if (horaInicial !== doc.data().horaInicio) {
                        let numeroHoras = parseInt(doc.data().horaFin.split(":")[0]) - parseInt(doc.data().horaInicio.split(":")[0]);

                        //for (let i = parseInt(doc.data().horaInicio.split(":")[0]); i <= parseInt(doc.data().horaFin.split(":")[0]); i++) {
                        if (parseInt(doc.data().horaInicio.split(":")[1]) >= parseInt(doc.data().horaFin.split(":")[1]) || numeroHoras > 0) {
                            for (let k = parseInt(doc.data().horaInicio.split(":")[1]); k <= 59; k++) {
                                if (k < 10) {
                                    arrayTiempo.push(horaActual.toString() + ":0" + k.toString());
                                } else {
                                    arrayTiempo.push(horaActual.toString() + ":" + k.toString());
                                }

                            }
                            horaActual++;
                            numeroHoras--;
                            while (numeroHoras > 0) {

                                for (let l = 0; l <= 59; l++) {

                                    if (l < 10) {
                                        arrayTiempo.push(horaActual.toString() + ":" + "0" + l.toString());
                                    } else {
                                        arrayTiempo.push(horaActual.toString() + ":" + l.toString());
                                    }
                                }
                                horaActual++;
                                numeroHoras--;
                            }
                            for (let k = 0; k <= parseInt(doc.data().horaFin.split(":")[1]); k++) {
                                if (k < 10) {
                                    arrayTiempo.push(horaActual.toString() + ":" + "0" + k.toString());
                                } else {
                                    arrayTiempo.push(horaActual.toString() + ":" + k.toString());
                                }
                            }
                        } else {


                            for (let k = parseInt(doc.data().horaInicio.split(":")[1]); k <= parseInt(doc.data().horaFin.split(":")[1]); k++) {
                                if (k < 10) {
                                    arrayTiempo.push(horaActual.toString() + ":0" + k.toString());
                                } else {
                                    arrayTiempo.push(horaActual.toString() + ":" + k.toString());
                                }

                            }

                        }


                        ////comparacion

                        if (mensaje !== "Cruce de horarios") {
                            for (let i = 0; i < arrayTiempo.length; i++) {
                                for (let j = 0; j < arrayTiempo2.length && mensaje !== "Cruce de horarios"; j++) {
                                    if (arrayTiempo[i] === arrayTiempo2[j]) {
                                        mensaje = "Cruce de horarios";
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }


        if (mensaje !== "Cruce de horarios") {

            const evento = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + '/' + mes).doc(id);
            await evento.update(data);

        }
        res.json(mensaje);


    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerEvento = async (req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const evento = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anho + '/' + mes).doc(id);
        const data = await evento.get();
        if (!data.exists) {
            res.status(404).send('Evento no encontrado');
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/*

const obtenerAnios = async (req, res, next) => {

    const anios = [];

    try {
        const aniosBase = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento');
        const data = await aniosBase.get()

        if (data.empty) {
            res.json("");
        } else {
            data.forEach(doc => {
                anios.push(doc.id);
            });
        }

        res.json(anios);

    } catch (error) {

    }
}

const obtenerMeses = async (req, res, next) => {

    const anios = req.body;
    const meses=[]
    console.log(anios);



    /*
    try {
        anios.forEach(doc => {
            const mesesBase = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/'+doc);
            const data = await mesesBase.get()
            if (data.empty) {
                res.json("");
            } else {
                data.forEach(doc2 => {
                    meses.push(doc2.id);
                });
            }

        });
        

        

        res.json(meses);

    } catch (error) {

    }
    */
//}


const obtenerEventosTodos = async (req, res, next) => {

    const anios = ["2021", "2022", "2023"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const fechasArray = [];
    try {

        for (let anio of anios) {
            for (let mes of meses) {
                //console.log('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anio + "/" + mes)
                try {


                    const fechas = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Evento/' + anio + "/" + mes);
                    const data = await fechas.get()

                    if (data.empty) {
                        //res.json("")
                    } else {
                        
                        data.forEach(doc => {
                            const evento = {                       
                                title: doc.data().nombreEvento,                                
                                start: doc.data().fecha+" "+doc.data().horaInicio+":00",
                                end: doc.data().fecha+" "+doc.data().horaFin+":00",                                
                            }
                            fechasArray.push(evento);
                        });

                        console.log(fechasArray)                        
                    }
                } catch (error) {

                }

            }
        }

        res.json(fechasArray);



    } catch (error) {

    }
}










module.exports = {
    obtenerEventos,
    busquedaEvento,
    obtenerEventosOrdenados,
    eliminarEvento,
    crearEvento,
    actualizarEvento,
    obtenerEvento,
    obtenerEventosTodos
}
