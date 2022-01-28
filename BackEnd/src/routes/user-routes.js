const express = require('express');
const {
    addUser,
    getAllEmails,
    obtenerNombre
} = require('../controllers/userController');

const {
    obtenerProveedores,
    busquedaProveedor,
    eliminarProveedor,
    actualizarProveedor,
    crearProveedor,
    obtenerProveedor,
    obtenerProveedoresOrdenados

} = require('../controllers/proveedorController');

//Empleado
const {
    obtenerEmpleados,
    busquedaEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    crearEmpleado,
    obtenerEmpleado,
    obtenerEmpleadosOrdenados
} = require('../controllers/empleadoController');

const router = express.Router();

// Login
router.post('/usuario', addUser);
router.get('/emails', getAllEmails);


//Proveedores
router.get('/proveedores', obtenerProveedores);
router.get('/proveedores/busqueda/:busqueda', busquedaProveedor);
router.delete('/proveedores/:id', eliminarProveedor);
router.put('/proveedor/:id', actualizarProveedor);
router.post('/proveedor', crearProveedor);
router.get('/proveedor/:id', obtenerProveedor);
router.get('/proveedores/proveedores-ordenados/:filtro', obtenerProveedoresOrdenados);

//Menu
router.get('/correo/:correo', obtenerNombre);

//Empleados
router.get('/empleados/', obtenerEmpleados);
router.get('/empleados/busqueda/:busqueda', busquedaEmpleado);
router.delete('/empleados/:id', eliminarEmpleado);
router.put('/empleado/:id', actualizarEmpleado);
router.post('/empleado', crearEmpleado);
router.get('/empleado/:id', obtenerEmpleado);
router.get('/empleados/empleados-ordenados/:filtro', obtenerEmpleadosOrdenados);


//NOMINA PAGOS
const {
    obtenerNominaPagos,
    busquedaNominasPago,
    obtenerNominasPagoOrdenados,
    obtenerNominaPago,
    actualizarRolIndividual,
    crearNominaPago,
    comprobarIdNominaPago,
    eliminarNominasPago
} = require('../controllers/nominaPagoController');

const {
    obtenerCed
} = require('../controllers/nominaPagoController');
router.get('/nominasPago/ced/:id', obtenerCed);
router.get('/nominasPago/:anho/:mes', obtenerNominaPagos);
router.get('/nominasPago/:anho/:mes/busqueda/:busqueda', busquedaNominasPago);
router.get('/nominasPago/:anho/:mes/nominasPago-ordenados/:filtro', obtenerNominasPagoOrdenados);
router.get('/nominasPago/:anho/:mes/:id', obtenerNominaPago);
router.put('/nominasPago/:anho/:mes/:id', actualizarRolIndividual);
router.post('/nominasPago/:anho/:mes/:cedula', crearNominaPago);
router.get('/nominasPago/comprobar/:anho/:mes/:id', comprobarIdNominaPago);
router.delete('/nominasPago/eliminar/:anho/:mes', eliminarNominasPago);

//Salario
const {
    obtenerSalarios,
    busquedaSalario,
    eliminarSalario,
    actualizarSalario,
    crearSalario,
    obtenerSalario,
    obtenerSalariosOrdenados
} = require('../controllers/salarioController');
router.get('/salarios/', obtenerSalarios);
router.get('/salarios/busqueda/:busqueda', busquedaSalario);
router.delete('/salarios/:id', eliminarSalario);
router.put('/salario/:id', actualizarSalario);
router.post('/salario', crearSalario);
router.get('/salario/:id', obtenerSalario);
router.get('/salarios/salarios-ordenados/:filtro', obtenerSalariosOrdenados);




module.exports = {
    routes: router
}