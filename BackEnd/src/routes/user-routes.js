const express = require('express');
const {addUser, 
      // getAllStudents, 
      // getStudent,
       //updateStudent,
       //deleteStudent
      } = require('../controllers/userController');

const router = express.Router();

router.post('/usuario', addUser);
//router.get('/students', getAllStudents);
//router.get('/student/:id', getStudent);
//router.put('/student/:id', updateStudent);
//router.delete('/student/:id', deleteStudent);


module.exports = {
    routes: router
}