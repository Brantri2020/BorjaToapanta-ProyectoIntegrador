'use strict';

const firebase = require('../db');
const Usuario = require('../models/user');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Usuario').doc().set(data);
        res.json('Usuario guardado exitosamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getAllEmails = async (req, res, next) => {
    try {
        const usuarios = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Usuario');
        const data = await usuarios.get();

        const emailsArray = [];
        if(data.empty) {
            res.status(404).send('No usuarios record found');
        }else {
            data.forEach(doc => {
                emailsArray.push(doc.data().correoUsuario);
            });
            res.json(emailsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const obtenerNombre = async (req, res, next) => {

    try {
        
        const correo = req.params.correo;        
        const nombresUsuario = await firestore.collection('/Gobierno Autonomo Descentralizado Parroquial/Uyumbicho/Usuario');
        const data = await nombresUsuario.get();      
        var user= "";
        
        if (data.empty) {
            res.status(404).send('No se encontró el nombre');
        } else {
            data.forEach(doc => {
                const usuario = new Usuario(
                    doc.id,
                    doc.data().nombre,
                    doc.data().apellido,
                    doc.data().cedula,
                    doc.data().direccion,
                    doc.data().correoUsuario
                    
                );

                if (doc.data().correoUsuario == correo){
                    user=doc.data().nombre +" "+ doc.data().apellido;
                }

                   
            });
            if(user.length!=0){
                res.json(user)
            
                
            }else{
                res.status(404).send('No existe el usuario por correo');
            }
            

            
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/*
const getAllStudents = async (req, res, next) => {
    try {
        const students = await firestore.collection('students');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().fatherName,
                    doc.data().class,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().subject,
                    doc.data().year,
                    doc.data().semester,
                    doc.data().status
                );
                studentsArray.push(student);
            });
            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
*/


module.exports = {
    addUser,
    getAllEmails,
    obtenerNombre
    //getStudent,
    //updateStudent,
    //deleteStudent
}