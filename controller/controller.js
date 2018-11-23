require('babel-register');

const express = require('express');
const {success, error} = require('./functions');
const studentsRouter = express.Router();
const connection = require('../model');

// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students/1
// exemple:
// key = name
// value = Alexendra
studentsRouter.route('/:id(\\d+)')

    // get a student from an id
    .get((req, res) => {
        const resultQuery = 'SELECT * FROM students WHERE id = ?;';
        connection.query(resultQuery, req.params.id, (err, result) => {
            if(err) 
                res.status(500).send('error to find one student');
            else {
                if (result[0] !== undefined)
                    res.json(success(result));
                else
                    res.json(error(`Wrong id value ${req.params.id}`));
            }
        })
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
        if (req.query.max != undefined && req.query.max > 0) {
            const resultQuery = 'SELECT * FROM students LIMIT ?;';       
            connection.query(resultQuery, parseInt(req.query.max), (error, result) => {
                if(error) {
                    console.log('error in get with limit max', error.message);
                    res.status(500).send('error to find all students with limit');
                }
                else
                    res.json(success(result));
            })
        }
        else if(req.query.max != undefined)
            res.json(error('Wrong max value'));
        else {
            const resultQuery = 'SELECT * FROM students;';
            connection.query(resultQuery, (error, result) => {
                if(error) 
                    res.status(500).send('error to find all students');
                else
                    res.json(success(result));
            })
        }
    })

    // Insert a student
    .post((req, res) => {
        if (req.body.name) {
            let resultQuery = `INSERT INTO students (name)
            SELECT * FROM (SELECT ?) AS tmp
            WHERE NOT EXISTS (
                SELECT name FROM students WHERE name = ?
            ) LIMIT 1;`;
            connection.query(resultQuery, [req.body.name, req.body.name], (err, result) => {
                if(err) 
                    res.status(500).send(`error to insert the name : ${req.body.name}`);
                else {                    
                    if (result.insertId) {
                        // returns an object representing the added student
                        resultQuery = 'SELECT * FROM students WHERE id = ?;';
                        connection.query(resultQuery, result.insertId, (err, result) => {
                            if(err) 
                                res.status(500).send('Error for return the inserted student');
                            else {
                                if (result[0] !== undefined)
                                    res.json(success(result));
                                else
                                    res.json(error(`Wrong id value ${req.params.id}`));
                            }
                        })
                    }
                    else {
                        res.json(error('Name already Exist'));
                    }
                }
            })
        }
        else {
            res.json(error('No Name value'));
        }
    });

module.exports = studentsRouter;
