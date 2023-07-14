// middleware/validationMiddleware.js

const { body, validationResult } = require('express-validator');

// Validation rules for car creation
const validateCarCreation = [
  body('brand').notEmpty().withMessage('Brand is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('year').notEmpty().withMessage('Year is required').isNumeric().withMessage('Year must be a number'),
  body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number')
];

const validateCarCreationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateCarCreation, validateCarCreationMiddleware };