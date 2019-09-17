const {check, validationResult} = require("express-validator");

// Check errors
exports.createPostValidator = [
    // Title validator
    check("title", "Write a title").not().isEmpty(),
    check('title').isLength({min: 5, max: 30}).withMessage('Title must between 4 to 30 characters'),
    check("body").isLength({min: 5, max: 2000})
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
