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
        if(req.body.name)  {
            const resultQuery = 'UPDATE students SET name = ? WHERE id = ?;';
            connection.query(resultQuery, [req.body.name, req.params.id], (error, result) => {
                if(error) 
                    res.status(500).send(`error to update the student: ${req.params.id}`);
                else
                    res.json(success(result));
            })
        }
        else {
            res.json(error('No Name value'));
        }
    })
    
    // delete a student from an id
    .delete((req, res) => {
        const resultQuery = 'DELETE FROM students WHERE id = ?;';
        connection.query(resultQuery, +(req.params.id), (error, result) => {           
            if(error) 
                res.status(500).send(`error to delete the student: ${req.params.id}`);
            else
                res.json(success(result));
        })
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
