const express = require('express');

const router = express.Router();

const { Students } = require('../controllers');

router
  .route('/:id(\\d+)')
  .get(Students.getByID)
  .put(Students.update)
  .delete(Students.delete);

router
  .route('/')
  .get(Students.getAll)
  .post(Students.create);

module.exports = router;
