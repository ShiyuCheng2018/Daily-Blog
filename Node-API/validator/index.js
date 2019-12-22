const {check, validationResult} = require("express-validator");

// Check errors
exports.createPostValidator = [
    // Title validator
    check("title", "Please give a title").not().isEmpty(),
    check('title').isLength({min: 5, max: 50}).withMessage('Title must between 5 to 50 characters'),
    check("body").isLength({min: 5, max: 3000}).withMessage('Title must between 5 to 3000 characters'),
];

// Get error messages
exports.getErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return res.status(400).json({error: firstError});
    }
    next();
};

exports.userSignUpValidator = (req, res, next) => {
  // Name is not null and between 4-10 characters
    check("name", "Name is required").not().isEmpty();
  // Email is not null, valid and normalized
    check("email", "Email must be between 3 to 32 characters")
        .matches(/.+@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
  // Check for password
    check("password", "Password is required").not().isEmpty();
    check("password")
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
  // Check or errors
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return res.status(400).json({error: firstError});
    }
    next();
};
