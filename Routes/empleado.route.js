const express = require('express')
const empleadoRuta = express.Router()

// Declaramos un objepto de nuestro modelo
let Empleado = require('../models/Empleado')

// Metodo para agregar un nuevo empleado
empleadoRuta.route('/create').post((req,res) => {
    Empleado.create(req.body)
    .then((data) =>{
        console.log('Si se insertó un documento')
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
    })

    //Metodo para obtener todos los empelados
    empleadoRuta.route('/empleados').get((req,res) => {
        Empleado.find()
        .then((data) =>{
            res.send(data)
        })
        .catch((err) => {
            console.error(err)
        })
    })

    //Metodo obtener un solo empleado por Id
    empleadoRuta.route('/empleado/:id').get((req,res) => {
        Empleado.findById(req.params.id)
        .then((data) =>{
            res.send(data)
        })
        .catch((err) =>{
            console.error(err)
        })
    })

    //Método Actualizar empleado
    empleadoRuta.route('/update/:id').put((req,res) => {
        Empleado.findByIdAndUpdate(req.params.id,{
            $set: req.body
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.error(err)
        })
    })

    //Método Eliminar un empelado
    empleadoRuta.route('/delete/:id').delete((req,res) => {
        Empleado.findByIdAndRemove(req.params.id)
        then((data) =>{
            res.send(data)
        })
        .catch((err) => {
            console.error(err)
        })
    })

})


module.exports = empleadoRuta;