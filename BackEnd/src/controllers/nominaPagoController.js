'use strict';

const firebase = require('../db');
const NominaPago = require("../models/nominaPago");
const firestore = firebase.firestore();


const obtenerNominasPago = async(req, res, next) => {

    try {
        const anho = req.params.anho;
        const mes = req.params.mes;
        const nominasPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/'+anho+"/"+mes);
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
                                doc2.data().salario,
                                doc2.data().cargo,
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
            data.forEach(doc => {
                const nominaPag = new NominaPago(
                    doc.id,
                    doc.data().cedula,
                    doc.data().nomina,
                    doc.data().salario,
                    doc.data().cargo,
                    doc.data().numHorasExtras,
                    doc.data().valorHorasExtras,
                    doc.data().sePagaFondosReserva,
                    doc.data().fondosReserva,
                    doc.data().totalIngresos,
                    doc.data().iess,
                    doc.data().anticipo,
                    doc.data().prestamiIess,               
                    doc.data().totalEgreso,
                    doc.data().liquidoRecibir,
                    doc.data().numeroCuenta,
                    doc.data().tipoCuenta,
                    doc.data().institucionFinanciera              
                );
                nominasPagoArray.push(nominaPag);
            });
            res.json(nominasPagoArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const busquedaNominasPago = async(req, res, next) => {

    try {
        const nombre = req.params.busqueda;
        const anho = req.params.anho;
        const mes = req.params.mes;

        const nominasPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/'+anho+"/"+mes);
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
                                doc2.data().salario,
                                doc2.data().cargo,
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
                    doc.data().salario,
                    doc.data().cargo,
                    doc.data().numHorasExtras,
                    doc.data().valorHorasExtras,
                    doc.data().sePagaFondosReserva,
                    doc.data().fondosReserva,
                    doc.data().totalIngresos,
                    doc.data().iess,
                    doc.data().anticipo,
                    doc.data().prestamiIess,               
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
                doc.data().numHorasExtras == nombre ||
                doc.data().valorHorasExtras == nombre ||
                doc.data().sePagaFondosReserva == nombre ||
                doc.data().fondosReserva == nombre ||
                doc.data().totalIngresos == nombre ||
                doc.data().iess == nombre ||
                doc.data().anticipo == nombre ||
                doc.data().prestamiIess == nombre ||       
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
const obtenerNominasPagoOrdenados = async(req, res, next) => {
    try {
        const anho = req.params.anho;
        const mes = req.params.mes;
        const filtro = req.params.filtro;
        const nominasPago = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/NominaPago/'+anho+"/"+mes)
        .orderBy(filtro, "asc");
        const data = await nominasPago.get();        
        const nominasPagoArray = [];
        if (data.empty) {

            try {
                const empleados = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Empleado')
                .orderBy(filtro, "asc");
                const data2 = await empleados.get();                
                if (data2.empty) {
                    res.status(404).send('No hay empleados para llenar');
                } else {                    
                        data2.forEach(doc2 => {
                            const nominaPag = new NominaPago(
                                doc2.id,
                                doc2.data().cedula,
                                doc2.data().nombre,
                                doc2.data().salario,
                                doc2.data().cargo,
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
            data.forEach(doc => {
                const nominaPag = new NominaPago(
                    doc.id,
                    doc.data().cedula,
                    doc.data().nomina,
                    doc.data().salario,
                    doc.data().cargo,
                    doc.data().numHorasExtras,
                    doc.data().valorHorasExtras,
                    doc.data().sePagaFondosReserva,
                    doc.data().fondosReserva,
                    doc.data().totalIngresos,
                    doc.data().iess,
                    doc.data().anticipo,
                    doc.data().prestamiIess,               
                    doc.data().totalEgreso,
                    doc.data().liquidoRecibir,
                    doc.data().numeroCuenta,
                    doc.data().tipoCuenta,
                    doc.data().institucionFinanciera              
                );
                nominasPagoArray.push(nominaPag);
            });
            res.json(nominasPagoArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    obtenerNominasPago,
    busquedaNominasPago,
    obtenerNominasPagoOrdenados

}
