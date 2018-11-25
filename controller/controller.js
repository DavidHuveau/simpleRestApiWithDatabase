require('babel-register');

const express = require('express');
const { success, error } = require('./functions');
const studentsRouter = express.Router();

const { Students, ClassRoom } = require('../model');

// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/Students/1
// exemple:
// key = name
// value = Alexendra
studentsRouter.route('/students/:id(\\d+)')

    // get a student from an id
    .get((req, res) => {
        Students.getByID(req.params.id)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    })

    // update a student from an id
    .put((req, res) => {
        Students.update(req.params.id, req.body.name)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    })
    
    // delete a student from an id
    .delete((req, res) => {
        Students.delete(req.params.id)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    });


// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/Students
// exemple:
// key = name
// value = David
studentsRouter.route('/students/')

    // Get a student list by limiting the number of results
    // http://localhost:8080/api/V1/Students?max=2
    .get((req, res) => {
        Students.getAll(req.query.max)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    })

    // Insert a student
    .post((req, res) => {
        Students.add(req.body.name)
        .then(result => res.json(success(result)))
        .catch(err => res.json(error(err.message)));
    });

studentsRouter.route('/classroom/')
    .get((req, res) => {
        res.json(success(ClassRoom.getAll()));
    })

module.exports = studentsRouter;
