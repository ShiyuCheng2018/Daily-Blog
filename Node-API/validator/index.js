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
