require('babel-register');
const express = require('express');
const { success } = require('./functions');
const { ClassRoom } = require('../model');

const classroomRouter = express.Router();

classroomRouter.route('/').get((req, res) => {
  res.json(success(ClassRoom.getAll()));
});

module.exports = classroomRouter;
