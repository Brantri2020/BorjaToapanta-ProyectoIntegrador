const express = require('express');
const {addUser, getAllEmails, obtenerNombre
         
      // getAllStudents, 
      // getStudent,
       //updateStudent,
       //deleteStudent
      } = require('../controllers/userController');
      
const {obtenerProveedores, busquedaProveedor,
        eliminarProveedor, actualizarProveedor, crearProveedor, obtenerProveedor, obtenerProveedoresOrdenados
             
          // getAllStudents, 
          // getStudent,
           //updateStudent,
           //deleteStudent
          } = require('../controllers/proveedorController');
    

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


//router.get('/students', getAllStudents);
//router.get('/student/:id', getStudent);
//router.put('/student/:id', updateStudent);
//router.delete('/student/:id', deleteStudent);


module.exports = {
    routes: router
}