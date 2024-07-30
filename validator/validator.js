const { body, validationResult } = require('express-validator');

exports.validateAppointment = [
  body('studentId').isInt().withMessage('Student ID must be an integer'),
  body('teacherId').isInt().withMessage('Teacher ID must be an integer'),
  body('date').isISO8601().withMessage('Date must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
