require('babel-register');

const express = require('express');
const {success, error} = require('./functions');
const studentsRouter = express.Router();
const connection = require('../model');




const students = require('../model/classes/students-class')(connection);

// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students/1
// exemple:
// key = name
// value = Alexendra
studentsRouter.route('/:id(\\d+)')

    // get a student from an id
    .get((req, res) => {
        students.getByID(req.params.id)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    })

    // update a student from an id
    .put((req, res) => {
        students.update(req.params.id, req.body.name)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    })
    
    // delete a student from an id
    .delete((req, res) => {
        students.delete(req.params.id)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    });


// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students
// exemple:
// key = name
// value = David
studentsRouter.route('/')

    // Get a student list by limiting the number of results
    // http://localhost:8080/api/V1/students?max=2
    .get((req, res) => {
        students.getAll(req.query.max)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    })

    // Insert a student
    .post((req, res) => {
        students.add(req.body.name)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    });

module.exports = studentsRouter;
