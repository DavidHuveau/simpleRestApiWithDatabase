const { success, error } = require('./functions');
const { Student } = require('../model');

const Students = class {
  // Get a student from an id
  // http://localhost:8080/api/V1/Students/1
  static getByID(req, res) {
    Student.getByID(req.params.id)
      .then(result => res.json(success(result)))
      .catch(err => res.json(error(err.message)));
  }

  // Get a student list by limiting the number of results
  // http://localhost:8080/api/V1/Students?max=2
  static getAll(req, res) {
    Student.getAll(req.query.max)
      .then(result => res.json(success(result)))
      .catch(err => res.json(error(err.message)));
  }

  // Update a student from an id
  // use Postman with parameter: x-www-form-urlencoded
  // http://localhost:8080/api/V1/Students/1
  // exemple:
  // key = name
  // value = Alexendra
  static update(req, res) {
    Student.update(req.params.id, req.body.name)
      .then(result => res.json(success(result)))
      .catch(err => res.json(error(err.message)));
  }

  // delete a student from an id
  // http://localhost:8080/api/V1/Students/1
  static delete(req, res) {
    Student.delete(req.params.id)
      .then(result => res.json(success(result)))
      .catch(err => res.json(error(err.message)));
  }

  // Insert a student
  // use Postman with parameter: x-www-form-urlencoded
  // http://localhost:8080/api/V1/Students
  // exemple:
  // key = name
  // value = David
  static create(req, res) {
    Student.create(req.body.name)
      .then(result => res.json(success(result)))
      .catch(err => res.json(error(err.message)));
  }
};

module.exports = Students;
