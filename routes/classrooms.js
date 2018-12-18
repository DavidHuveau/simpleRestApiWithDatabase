const express = require('express');

const router = express.Router();

const { ClassRooms } = require('../controllers');

router.route('/').get(ClassRooms.getAll);

module.exports = router;
