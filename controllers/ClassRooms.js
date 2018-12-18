const { success, error } = require('./functions');
const { ClassRoom } = require('../model');

const ClassRooms = class {
  static getAll(req, res) {
    ClassRoom.getAll()
      .then(result => res.json(success(result)))
      .catch(err => res.json(error(err.message)));
  }
};

module.exports = ClassRooms;
