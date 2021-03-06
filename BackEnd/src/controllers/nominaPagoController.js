'use strict';

const firebase = require('../db');
const Anticipo = require('../models/Anticipo');
const NominaPago = require("../models/nominaPago");
const NominaPagoEmpleado = require("../models/nominaPagoEmpleado");
const firestore = firebase.firestore();


const obtenerCed = async (req, res, next) => {

    try {
        var cedula = "";
        const id = req.params.id;
        const empleado = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').doc(id);
        const data = await empleado.get();
        if (!data.exists) {
            res.status(404).send('Cedula no encontrada');
        } else {


            cedula = data.data().cedula;

            res.json(cedula);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const obtenerNominaPagos = async (req, res, next) => {


    try {
        const anho = req.params.anho;
        const mes = req.params.mes;

        const nominasPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes);
        const data = await nominasPago.get();
        const nominasPagoArray = [];
        if (data.empty) {

            try {
                const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado');
                const data2 = await empleados.get();
                const empleadosArray = [];
                if (data2.empty) {
                    res.status(404).send('No hay empleados para llenar');
                } else {
                    data2.forEach(doc2 => {
                        const nominaPag = new NominaPago(
                            doc2.id,
                            doc2.data().cedula,
                            doc2.data().nombre,
                            doc2.data().cargo,
                            doc2.data().salario,
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            doc2.data().numeroCuenta,
                            doc2.data().tipoCuenta,
                            doc2.data().institucionFinanciera
                        );
                        nominasPagoArray.push(nominaPag);
                    });
                    res.json(nominasPagoArray);
                }
            } catch (error) {
                res.status(400).send(error.message);
            }

        } else {
            var sumSalario = 0;
            var sumHorasExtras = 0;
            var sumValorHorasExtras = 0;
            var sumFondosReserva = 0;
            var sumTotalIngresos = 0;
            var sumIess = 0;
            var sumAnticipo = 0;
            var sumPrestamoIess = 0;
            var sumTotalEgresos = 0;
            var sumLiquidoRecibir = 0;


            data.forEach(doc => {
                const nominaPag = new NominaPago(
                    doc.id,
                    doc.data().cedula,
                    doc.data().nomina,
                    doc.data().cargo,
                    doc.data().salario,
                    doc.data().numeroHorasExtras,
                    doc.data().valorHorasExtras,
                    doc.data().sePagaFondosReserva,
                    doc.data().fondosReserva,
                    doc.data().porcentajeFondo,
                    doc.data().totalIngresos,
                    doc.data().iess,
                    doc.data().porcentajeIess,
                    doc.data().anticipo,
                    doc.data().prestamoIess,
                    doc.data().totalEgreso,
                    doc.data().liquidoRecibir,
                    doc.data().numeroCuenta,
                    doc.data().tipoCuenta,
                    doc.data().institucionFinanciera
                );
                if (doc.data().salario.toString() !== "") {
                    sumSalario += parseFloat(doc.data().salario.toString());
                }
                if (doc.data().numeroHorasExtras.toString() !== "") {
                    sumHorasExtras += parseFloat(doc.data().numeroHorasExtras.toString());
                }
                if (doc.data().valorHorasExtras.toString() !== "") {
                    sumValorHorasExtras += parseFloat(doc.data().valorHorasExtras.toString());
                }
                if (doc.data().fondosReserva.toString() !== "") {
                    sumFondosReserva += parseFloat(doc.data().fondosReserva.toString());
                }
                if (doc.data().totalIngresos.toString() !== "") {
                    sumTotalIngresos += parseFloat(doc.data().totalIngresos.toString());
                }
                if (doc.data().iess.toString() !== "") {
                    sumIess += parseFloat(doc.data().iess.toString());
                }

                if (doc.data().anticipo.toString() !== "") {
                    sumAnticipo += parseFloat(doc.data().anticipo.toString());
                }
                if (doc.data().prestamoIess.toString() !== "") {
                    sumPrestamoIess += parseFloat(doc.data().prestamoIess.toString());
                }
                if (doc.data().totalEgreso.toString() !== "") {
                    sumTotalEgresos += parseFloat(doc.data().totalEgreso.toString());
                }
                if (doc.data().liquidoRecibir.toString() !== "") {
                    sumLiquidoRecibir += parseFloat(doc.data().liquidoRecibir.toString());
                }


                nominasPagoArray.push(nominaPag);
            });
            const sumaTodo = new NominaPago(
                0,
                "SUMA",
                "--->",
                "--->",
                sumSalario.toFixed(2),
                sumHorasExtras.toFixed(2),
                sumValorHorasExtras.toFixed(2),
                "---",
                sumFondosReserva.toFixed(2),
                "---",
                sumTotalIngresos.toFixed(2),
                sumIess.toFixed(2),
                "---",
                sumAnticipo.toFixed(2),
                sumPrestamoIess.toFixed(2),
                sumTotalEgresos.toFixed(2),
                sumLiquidoRecibir.toFixed(2),
                "---",
                "---",
                "---",
            );
            nominasPagoArray.push(sumaTodo);
            res.json(nominasPagoArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const obtenerNominaPago = async (req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;
        const nominasPagoArray = [];

        const nominaPago1 = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes).doc(id);
        const data = await nominaPago1.get();
        if (!data.exists) {

            try {
                const nominaPago2 = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado/').doc(id);
                const data2 = await nominaPago2.get();
                if (!data2.exists) {
                    res.json("");
                } else {


                    const nominaPag2 = new NominaPago(
                        0,
                        data2.data().cedula,
                        data2.data().nombre,
                        data2.data().cargo,
                        data2.data().salario,
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        data2.data().numeroCuenta,
                        data2.data().tipoCuenta,
                        data2.data().institucionFinanciera
                    );
                    //nominasPagoArray.push(nominaPag2);                   
                    res.json(nominaPag2);
                }
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const busquedaNominasPago = async (req, res, next) => {

    try {
        const nombre = req.params.busqueda;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const nominasPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes);
        const data = await nominasPago.get();
        const nominasPagoArray = [];
        if (data.empty) {
            try {
                const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado');
                const data2 = await empleados.get();
                const empleadosArray = [];
                if (data2.empty) {
                    res.status(404).send('No hay empleados para llenar');
                } else {
                    data2.forEach(doc2 => {
                        const nominaPag = new NominaPago(
                            doc2.id,
                            doc2.data().cedula,
                            doc2.data().nombre,
                            doc2.data().cargo,
                            doc2.data().salario,
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            doc2.data().numeroCuenta,
                            doc2.data().tipoCuenta,
                            doc2.data().institucionFinanciera
                        );
                        if (doc2.data().cedula == nombre ||
                            doc2.data().nomina == nombre ||
                            doc2.data().salario == nombre ||
                            doc2.data().cargo == nombre ||
                            doc2.data().numeroCuenta == nombre ||
                            doc2.data().tipoCuenta == nombre ||
                            doc2.data().institucionFinanciera == nombre) {
                            empleadosArray.push(nominaPag);
                        }
                    });
                    res.json(empleadosArray);
                }
            } catch (error) {
                res.status(400).send(error.message);
            }




        } else {
            data.forEach(doc => {
                const nominaPag = new NominaPago(
                    doc.id,
                    doc.data().cedula,
                    doc.data().nomina,
                    doc.data().cargo,
                    doc.data().salario,
                    doc.data().numeroHorasExtras,
                    doc.data().valorHorasExtras,
                    doc.data().sePagaFondosReserva,
                    doc.data().fondosReserva,
                    doc.data().porcentajeFondo,
                    doc.data().totalIngresos,
                    doc.data().iess,
                    doc.data().porcentajeIess,
                    doc.data().anticipo,
                    doc.data().prestamoIess,
                    doc.data().totalEgreso,
                    doc.data().liquidoRecibir,
                    doc.data().numeroCuenta,
                    doc.data().tipoCuenta,
                    doc.data().institucionFinanciera
                );

                if (doc.data().cedula == nombre ||
                    doc.data().nomina == nombre ||
                    doc.data().salario == nombre ||
                    doc.data().cargo == nombre ||
                    doc.data().numeroHorasExtras == nombre ||
                    doc.data().valorHorasExtras == nombre ||
                    doc.data().sePagaFondosReserva == nombre ||
                    doc.data().fondosReserva == nombre ||
                    doc.data().porcentajeFondo == nombre ||
                    doc.data().totalIngresos == nombre ||
                    doc.data().iess == nombre ||
                    doc.data().porcentajeIess == nombre ||
                    doc.data().anticipo == nombre ||
                    doc.data().prestamoIess == nombre ||
                    doc.data().totalEgreso == nombre ||
                    doc.data().liquidoRecibir == nombre ||
                    doc.data().numeroCuenta == nombre ||
                    doc.data().tipoCuenta == nombre ||
                    doc.data().institucionFinanciera == nombre) {
                    nominasPagoArray.push(nominaPag);
                }


            });

            res.json(nominasPagoArray);

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// ordenar
const obtenerNominasPagoOrdenados = async (req, res, next) => {
    try {
        const anho = req.params.anho;
        const mes = req.params.mes;
        const filtro = req.params.filtro;
        const nominasPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes)
            .orderBy(filtro, "asc");
        const data = await nominasPago.get();
        const nominasPagoArray = [];
        if (data.empty) {

            try {
                const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado')
                    .orderBy(filtro, "asc");
                const data2 = await empleados.get();
                if (data2.empty) {

                } else {
                    data2.forEach(doc2 => {
                        const nominaPag = new NominaPago(
                            doc2.id,
                            doc2.data().cedula,
                            doc2.data().nombre,
                            doc2.data().cargo,
                            doc2.data().salario,
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            doc2.data().numeroCuenta,
                            doc2.data().tipoCuenta,
                            doc2.data().institucionFinanciera
                        );
                        nominasPagoArray.push(nominaPag);
                    });
                    res.json(nominasPagoArray);
                }
            } catch (error) {
                res.status(400).send(error.message);
            }

        } else {
            var sumSalario = 0;
            var sumHorasExtras = 0;
            var sumValorHorasExtras = 0;
            var sumFondosReserva = 0;
            var sumTotalIngresos = 0;
            var sumIess = 0;
            var sumAnticipo = 0;
            var sumPrestamoIess = 0;
            var sumTotalEgresos = 0;
            var sumLiquidoRecibir = 0;

            data.forEach(doc => {
                const nominaPag = new NominaPago(
                    doc.id,
                    doc.data().cedula,
                    doc.data().nomina,
                    doc.data().cargo,
                    doc.data().salario,
                    doc.data().numeroHorasExtras,
                    doc.data().valorHorasExtras,
                    doc.data().sePagaFondosReserva,
                    doc.data().fondosReserva,
                    doc.data().porcentajeFondo,
                    doc.data().totalIngresos,
                    doc.data().iess,
                    doc.data().porcentajeIess,
                    doc.data().anticipo,
                    doc.data().prestamoIess,
                    doc.data().totalEgreso,
                    doc.data().liquidoRecibir,
                    doc.data().numeroCuenta,
                    doc.data().tipoCuenta,
                    doc.data().institucionFinanciera
                );
                if (doc.data().salario.toString() !== "") {
                    sumSalario += parseFloat(doc.data().salario.toString());
                }
                if (doc.data().numeroHorasExtras.toString() !== "") {
                    sumHorasExtras += parseFloat(doc.data().numeroHorasExtras.toString());
                }
                if (doc.data().valorHorasExtras.toString() !== "") {
                    sumValorHorasExtras += parseFloat(doc.data().valorHorasExtras.toString());
                }
                if (doc.data().fondosReserva.toString() !== "") {
                    sumFondosReserva += parseFloat(doc.data().fondosReserva.toString());
                }
                if (doc.data().totalIngresos.toString() !== "") {
                    sumTotalIngresos += parseFloat(doc.data().totalIngresos.toString());
                }
                if (doc.data().iess.toString() !== "") {
                    sumIess += parseFloat(doc.data().iess.toString());
                }

                if (doc.data().anticipo.toString() !== "") {
                    sumAnticipo += parseFloat(doc.data().anticipo.toString());
                }
                if (doc.data().prestamoIess.toString() !== "") {
                    sumPrestamoIess += parseFloat(doc.data().prestamoIess.toString());
                }
                if (doc.data().totalEgreso.toString() !== "") {
                    sumTotalEgresos += parseFloat(doc.data().totalEgreso.toString());
                }
                if (doc.data().liquidoRecibir.toString() !== "") {
                    sumLiquidoRecibir += parseFloat(doc.data().liquidoRecibir.toString());
                }
                nominasPagoArray.push(nominaPag);
            });
            const sumaTodo = new NominaPago(
                0,
                "SUMA",
                "--->",
                "--->",
                sumSalario.toFixed(2),
                sumHorasExtras.toFixed(2),
                sumValorHorasExtras.toFixed(2),
                "---",
                sumFondosReserva.toFixed(2),
                "---",
                sumTotalIngresos.toFixed(2),
                sumIess.toFixed(2),
                "---",
                sumAnticipo.toFixed(2),
                sumPrestamoIess.toFixed(2),
                sumTotalEgresos.toFixed(2),
                sumLiquidoRecibir.toFixed(2),
                "---",
                "---",
                "---",
            );
            nominasPagoArray.push(sumaTodo);
            res.json(nominasPagoArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const actualizarRolIndividual = async (req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const data = req.body;
        const nominaPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes).doc(id);
        await nominaPago.update(data);
        res.json('Nomina actualizada correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const crearNominaPago = async (req, res, next) => {
    try {
        const data = req.body;
        const anho = req.params.anho;
        const mes = req.params.mes;
        const cedula = req.params.cedula;

        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes).doc().set(data);

        //Guardar todo el resto de empleados
        try {

            await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {



                    var nominaPagEmp = {
                        "cedula": doc.data().cedula,
                        "nomina": doc.data().nombre,
                        "cargo": doc.data().cargo,
                        "salario": doc.data().salario,
                        "numeroHorasExtras": "",
                        "valorHorasExtras": "",
                        "sePagaFondosReserva": "",
                        "fondosReserva": "",
                        "porcentajeFondo": "",
                        "totalIngresos": "",
                        "iess": "",
                        "porcentajeIess": "",
                        "anticipo": "",
                        "prestamoIess": "",
                        "totalEgreso": "",
                        "liquidoRecibir": "",
                        "numeroCuenta": doc.data().numeroCuenta,
                        "tipoCuenta": doc.data().tipoCuenta,
                        "institucionFinanciera": doc.data().institucionFinanciera
                    }



                    if (doc.data().cedula.toString() !== cedula) {
                        try {
                            firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes).doc().set(nominaPagEmp);

                        } catch (error) {
                            console.log(error.message);
                        }
                    } else {


                    }

                });
            })
                .catch(error => {
                    console.log("Error no puedo obtener estos datos: ", error)
                })
        } catch (error) {
            console.log(error.message);
        }

        res.json('Nomina de pago guardada exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const comprobarIdNominaPago = async (req, res, next) => {
    try {
        const id = req.params.id;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const nominaPago1 = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + "/" + mes).doc(id);
        const data2 = await nominaPago1.get();

        if (!data2.exists) {
            res.json("No");
        } else {
            res.json("Si");
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const eliminarNominasPago = async (req, res, next) => {


    try {
        const anho = req.params.anho;
        const mes = req.params.mes;
        const nominas = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + '/' + mes);
        const data = await nominas.get();
        const nominasIdArray = [];
        if (data.empty) {
            res.status(404).send('No se encontraron nominas id');
        } else {
            data.forEach(doc => {
                nominasIdArray.push(doc.id);
                try {

                    firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/' + anho + '/' + mes).doc(doc.id).delete();

                } catch (error) {
                    res.status(400).send(error.message);
                }


            });
            res.json('Proveedor eliminado correctamente');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }



}

const obtenerAnticipoHorasExtrasPorCedula = async (req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;
    const cedula = req.params.cedula;


    var valorDeAnticipo = 0;
    var valorAnticipoFinalStr = "";
    var salarioStr = "";

    try {

        const salario = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado').where("cedula", "==", cedula);
        const data3 = await salario.get();

        if (data3.empty) {
            salarioStr = "0.00"

        } else {
            data3.forEach(doc => {

                salarioStr = doc.data().salario;
                //console.log(salarioStr);
            });

        }
    } catch (error) {
        res.status(400).send(error.message);
    }

    try {
        const anticipo = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Anticipo/' + anho + "/" + mes).where("cedulaEmpleado", "==", cedula);
        const data = await anticipo.get();
        if (data.empty) {
            valorAnticipoFinalStr = '0.00';
        } else {
            data.forEach(doc => {
                valorDeAnticipo += parseFloat(doc.data().valorAnticipo);
                valorAnticipoFinalStr = valorDeAnticipo.toString();
                if (!valorDeAnticipo.toString().includes(".")) {
                    valorAnticipoFinalStr = valorDeAnticipo.toString() + ".00";
                }
            });



        }



    } catch (error) {
        res.status(400).send(error.message);
    }
    try {
        const horasExtrasD = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes).where("cedulaEmpleado", "==", cedula);
        const data2 = await horasExtrasD.get();

        if (data2.empty) {
            var horasExtras = {
                "cantidadHoras": "0",
                "valorFinalHoras": "0.00",
                "valorAnticipo": valorAnticipoFinalStr,
                "salario": salarioStr
            }

            res.json(horasExtras);
        } else {

            var horasExtras = "";
            var cantidadHorasSuma = 0;
            var valorFinalHoras = 0;
            var valorFinalStr = "";
            data2.forEach(doc => {
                cantidadHorasSuma += parseInt(doc.data().cantidadHoras);
                valorFinalHoras += parseFloat(doc.data().valorFinalHoras);
                if (!valorFinalHoras.toString().includes(".")) {
                    valorFinalStr = valorFinalHoras.toString() + ".00";
                }
                horasExtras = {
                    "cantidadHoras": cantidadHorasSuma,
                    "valorFinalHoras": valorFinalStr,
                    "valorAnticipo": valorAnticipoFinalStr,
                    "salario": salarioStr
                }



            });
            res.json(horasExtras);


        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
/*
const obtenerHorasExtrasPorCedula = async (req, res, next) => {
    const anho = req.params.anho;
    const mes = req.params.mes;
    const cedula = req.params.cedula;



    try {
        const anticipo = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/HorasExtra/' + anho + "/" + mes).where("cedulaEmpleado", "==", cedula);
        const data = await anticipo.get();
        if (data.empty) {
            var horasExtras = {
                cantidadHoras: "0",
                valorFinalHoras: "0.00"
            }

            res.json(horasExtras);
        } else {

            var horasExtras = "";
            var cantidadHorasSuma = 0;
            var valorFinalHoras = 0;
            var valorFinalStr = "";
            data.forEach(doc => {
                cantidadHorasSuma += parseInt(doc.data().cantidadHoras);
                valorFinalHoras += parseFloat(doc.data().valorFinalHoras);
                if (!valorFinalHoras.toString().includes(".")) {
                    valorFinalStr = valorFinalHoras.toString() + ".00";
                }
                horasExtras = {
                    "cantidadHoras": cantidadHorasSuma,
                    "valorFinalHoras": valorFinalStr
                }



            });
            res.json(horasExtras);


        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

*/


module.exports = {
    obtenerNominaPagos,
    busquedaNominasPago,
    obtenerNominasPagoOrdenados,
    obtenerNominaPago,
    actualizarRolIndividual,
    obtenerCed,
    crearNominaPago,
    comprobarIdNominaPago,
    eliminarNominasPago,
    obtenerAnticipoHorasExtrasPorCedula,
    //obtenerHorasExtrasPorCedula
}
